/**
 * The Malabar Oils - Frontend Cryptographic Security Layer
 * 
 * - Communicates with Python backend (/api/auth/login)
 * - Cryptographic SHA-256 salt verification fallback
 * - Client-side brute-force rate limiter (5 attempts max, 60s lockout)
 * - Session token expiry tracking
 */

const PASSKEY_SALT = "malabar_salt_periyakulam_1977";
// Precomputed SHA-256(salt + '1977')
// 1977 + malabar_salt_periyakulam_1977
const HASHED_PASSKEY_HEX = "86780c058c409cf8923e42ea2d8f0f038b32eec024cbbcdbeffbfdb0dbda9799";

const RATE_LIMIT_KEY = "malabar_sec_ratelimit_v1";
const SESSION_TOKEN_KEY = "malabar_sec_token_v1";

interface RateLimitState {
  failedAttempts: number;
  lockoutUntil: number;
}

function getRateLimitState(): RateLimitState {
  try {
    const raw = sessionStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) return { failedAttempts: 0, lockoutUntil: 0 };
    return JSON.parse(raw);
  } catch {
    return { failedAttempts: 0, lockoutUntil: 0 };
  }
}

function saveRateLimitState(state: RateLimitState) {
  try {
    sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(state));
  } catch {}
}

export function getRemainingLockoutSeconds(): number {
  const state = getRateLimitState();
  const now = Date.now();
  if (state.lockoutUntil > now) {
    return Math.ceil((state.lockoutUntil - now) / 1000);
  }
  return 0;
}

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export interface AuthResult {
  success: boolean;
  message: string;
  token?: string;
}

export async function authenticatePasskey(passkey: string): Promise<AuthResult> {
  const waitSeconds = getRemainingLockoutSeconds();
  if (waitSeconds > 0) {
    return {
      success: false,
      message: `System locked due to failed attempts. Please wait ${waitSeconds}s.`
    };
  }

  // 1. Try Python backend API first
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passkey: passkey.trim() })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.token) {
        saveRateLimitState({ failedAttempts: 0, lockoutUntil: 0 });
        sessionStorage.setItem(SESSION_TOKEN_KEY, data.token);
        return { success: true, message: 'Authenticated via Python Security API', token: data.token };
      }
    }
  } catch {
    // Backend offline / static mode fallback to cryptographic check below
  }

  // 2. Cryptographic Salted SHA-256 verification
  const computedHash = await sha256(passkey.trim() + PASSKEY_SALT);
  const isMatch = computedHash === HASHED_PASSKEY_HEX;

  const state = getRateLimitState();
  if (isMatch) {
    saveRateLimitState({ failedAttempts: 0, lockoutUntil: 0 });
    const dummyToken = `sec_client_${Date.now()}`;
    return { success: true, message: 'Access Granted', token: dummyToken };
  } else {
    state.failedAttempts += 1;
    if (state.failedAttempts >= 5) {
      state.lockoutUntil = Date.now() + 60000; // 1 min lockout
      saveRateLimitState(state);
      return {
        success: false,
        message: 'Security lockout: 5 incorrect attempts. Locked for 60 seconds.'
      };
    } else {
      saveRateLimitState(state);
      const remaining = 5 - state.failedAttempts;
      return {
        success: false,
        message: `Incorrect passkey. ${remaining} attempt${remaining > 1 ? 's' : ''} remaining.`
      };
    }
  }
}
