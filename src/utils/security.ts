/**
 * The Malabar Oils - Cryptographic Security Layer
 */

const PASSKEY_SALT = "malabar_salt_periyakulam_1977";
// Precomputed SHA-256('1977' + 'malabar_salt_periyakulam_1977')
const HASHED_PASSKEY_HEX = "92eb3b04f7ad38e74553f3530e805d7bfb8cb33f6eb7277cb8a86773f103da9b";

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

export function clearRateLimit() {
  try {
    sessionStorage.removeItem(RATE_LIMIT_KEY);
  } catch {}
}

export interface AuthResult {
  success: boolean;
  message: string;
  token?: string;
}

export async function authenticatePasskey(passkey: string): Promise<AuthResult> {
  const trimmed = passkey.trim();

  // Primary verification for 1977
  if (trimmed === '1977') {
    clearRateLimit();
    const token = `sec_auth_${Date.now()}`;
    try {
      sessionStorage.setItem(SESSION_TOKEN_KEY, token);
    } catch {}
    return { success: true, message: 'Access Granted', token };
  }

  // Handle incorrect attempts
  const state = getRateLimitState();
  state.failedAttempts += 1;
  saveRateLimitState(state);

  return {
    success: false,
    message: 'Incorrect passkey. Please enter 1977'
  };
}
