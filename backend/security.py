"""
The Malabar Oils - Security & Authentication Module (Python)
Features:
- Cryptographic PBKDF2-HMAC-SHA256 passkey hashing with unique salt
- Timing-attack safe comparisons (hmac.compare_digest)
- Secure session token signing with expiry (HMAC-SHA256)
- In-memory rate limiting against brute-force passkey guessing
"""

import os
import time
import hmac
import hashlib
import json
import base64
from typing import Tuple, Optional, Dict

# Secret key for signing session tokens (in production, set MALABAR_SECRET_KEY env var)
SECRET_KEY = os.environ.get("MALABAR_SECRET_KEY", "malabar_super_secure_key_1977_theni_tamilnadu").encode()

# Salt for passkey hashing
PASSKEY_SALT = os.environ.get("MALABAR_PASSKEY_SALT", "malabar_salt_periyakulam_1977").encode()

# Target passkey (1977) hashed with PBKDF2-HMAC-SHA256 (100,000 iterations)
def hash_passkey(passkey: str, salt: bytes = PASSKEY_SALT) -> str:
    """Hash passkey using PBKDF2-HMAC-SHA256 with 100,000 rounds."""
    key = hashlib.pbkdf2_hmac(
        'sha256',
        passkey.encode('utf-8'),
        salt,
        100000
    )
    return key.hex()

# Pre-computed reference hash for passkey '1977'
REFERENCE_PASSKEY_HASH = hash_passkey("1977")

# In-memory rate limiter: IP/client -> { "failed_attempts": int, "lockout_until": float }
_rate_limit_store: Dict[str, Dict] = {}
MAX_FAILED_ATTEMPTS = 5
LOCKOUT_DURATION_SECONDS = 60  # 1 minute lockout after 5 consecutive failures

def check_rate_limit(client_id: str) -> Tuple[bool, int]:
    """
    Check if client is currently locked out.
    Returns: (is_allowed: bool, seconds_remaining: int)
    """
    now = time.time()
    record = _rate_limit_store.get(client_id)
    if not record:
        return True, 0
    
    lockout_until = record.get("lockout_until", 0)
    if now < lockout_until:
        return False, int(lockout_until - now)
    
    # If lockout expired, reset attempts
    if lockout_until > 0 and now >= lockout_until:
        _rate_limit_store[client_id] = {"failed_attempts": 0, "lockout_until": 0}
        
    return True, 0

def record_attempt(client_id: str, success: bool):
    """Record a login attempt for rate limiting."""
    now = time.time()
    record = _rate_limit_store.setdefault(client_id, {"failed_attempts": 0, "lockout_until": 0})
    if success:
        _rate_limit_store[client_id] = {"failed_attempts": 0, "lockout_until": 0}
    else:
        record["failed_attempts"] += 1
        if record["failed_attempts"] >= MAX_FAILED_ATTEMPTS:
            record["lockout_until"] = now + LOCKOUT_DURATION_SECONDS

def verify_passkey(provided_passkey: str, client_id: str = "default") -> Tuple[bool, str]:
    """
    Verifies passkey with rate limiting and timing-safe equality.
    Returns: (is_valid: bool, message: str)
    """
    allowed, wait_secs = check_rate_limit(client_id)
    if not allowed:
        return False, f"Too many failed attempts. Locked for security. Try again in {wait_secs}s."

    # Compute hash of provided passkey
    provided_hash = hash_passkey(provided_passkey.strip())
    
    # Timing-safe comparison to prevent side-channel timing attacks
    is_valid = hmac.compare_digest(provided_hash, REFERENCE_PASSKEY_HASH)
    
    record_attempt(client_id, is_valid)
    
    if is_valid:
        return True, "Authenticated"
    else:
        attempts_left = MAX_FAILED_ATTEMPTS - _rate_limit_store[client_id]["failed_attempts"]
        return False, f"Invalid passkey. {max(0, attempts_left)} attempts remaining."

def create_session_token(role: str = "admin", duration_seconds: int = 1800) -> str:
    """
    Creates a cryptographically signed session token with expiry (30 mins).
    Format: base64(payload).signature
    """
    now = int(time.time())
    payload = {
        "role": role,
        "iat": now,
        "exp": now + duration_seconds
    }
    payload_bytes = json.dumps(payload, separators=(',', ':')).encode('utf-8')
    payload_b64 = base64.urlsafe_b64encode(payload_bytes).decode('utf-8').rstrip('=')
    
    # Sign payload
    signature = hmac.new(SECRET_KEY, payload_b64.encode('utf-8'), hashlib.sha256).hexdigest()
    return f"{payload_b64}.{signature}"

def verify_session_token(token: str) -> Tuple[bool, Optional[Dict]]:
    """
    Verifies the HMAC signature and expiration time of a session token.
    Returns: (is_valid: bool, payload_dict)
    """
    if not token or '.' not in token:
        return False, None
    
    payload_b64, signature = token.split('.', 1)
    expected_sig = hmac.new(SECRET_KEY, payload_b64.encode('utf-8'), hashlib.sha256).hexdigest()
    
    if not hmac.compare_digest(signature, expected_sig):
        return False, None
    
    try:
        # Re-add padding if needed
        padding = 4 - (len(payload_b64) % 4)
        if padding < 4:
            payload_b64 += '=' * padding
        payload_bytes = base64.urlsafe_b64decode(payload_b64)
        payload = json.loads(payload_bytes.decode('utf-8'))
        
        # Check expiry
        if time.time() > payload.get("exp", 0):
            return False, None
        
        return True, payload
    except Exception:
        return False, None

if __name__ == "__main__":
    print("Testing Security Module...")
    # Test passkey verification
    valid, msg = verify_passkey("1977")
    print(f"Verify '1977': {valid} ({msg})")
    assert valid, "Passkey 1977 should be valid!"
    
    invalid, msg = verify_passkey("wrong")
    print(f"Verify 'wrong': {invalid} ({msg})")
    assert not invalid, "Wrong passkey should be rejected!"
    
    # Test token creation and verification
    token = create_session_token()
    is_valid, payload = verify_session_token(token)
    print(f"Session Token Verification: {is_valid}, Payload: {payload}")
    assert is_valid, "Generated token should be valid!"
    print("Security Module Tests Passed Successfully!")
