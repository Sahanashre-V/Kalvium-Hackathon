import os
from datetime import datetime, timedelta
from typing import Any

import hashlib
import json
import secrets

# Try to use passlib if available; otherwise fall back to a PBKDF2 implementation
try:
    from passlib.context import CryptContext

    PWD_CONTEXT = CryptContext(schemes=["bcrypt"], deprecated="auto")
    _HAS_PASSLIB = True
except Exception:
    PWD_CONTEXT = None
    _HAS_PASSLIB = False

SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))


def get_password_hash(password: str) -> str:
    if _HAS_PASSLIB and PWD_CONTEXT is not None:
        try:
            return PWD_CONTEXT.hash(password)
        except Exception:
            # if passlib or its backend fails for any reason, fall back to PBKDF2
            pass
    # fallback: PBKDF2-HMAC-SHA256
    salt = secrets.token_hex(16)
    iterations = 100_000
    dk = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), iterations)
    return f"pbkdf2${iterations}${salt}${dk.hex()}"


def verify_password(plain_password: str, hashed_password: str) -> bool:
    if not hashed_password:
        return False
    # If passlib is available and hash looks like bcrypt or other supported scheme
    if _HAS_PASSLIB and PWD_CONTEXT is not None:
        try:
            return PWD_CONTEXT.verify(plain_password, hashed_password)
        except Exception:
            pass
    # handle our pbkdf2 fallback format
    try:
        if hashed_password.startswith('pbkdf2$'):
            parts = hashed_password.split('$')
            if len(parts) != 4:
                return False
            iterations = int(parts[1])
            salt = parts[2]
            dk_hex = parts[3]
            dk_check = hashlib.pbkdf2_hmac('sha256', plain_password.encode('utf-8'), salt.encode('utf-8'), iterations).hex()
            return secrets.compare_digest(dk_check, dk_hex)
    except Exception:
        return False
    # last-resort fallback: compare plaintext (for legacy data)
    return plain_password == hashed_password


def create_access_token(subject: str | int, expires_delta: timedelta | None = None) -> str:
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode: dict[str, Any] = {"exp": expire, "sub": str(subject)}
    # Prefer python-jose JWT if available, otherwise emit a simple HMAC-signed token
    try:
        from jose import jwt
    except Exception:
        import base64
        import hmac
        import hashlib

        payload = {"exp": int(expire.timestamp()), "sub": str(subject)}
        payload_json = json.dumps(payload)
        payload_b64 = base64.urlsafe_b64encode(payload_json.encode()).rstrip(b"=").decode()
        sig = hmac.new(SECRET_KEY.encode(), payload_b64.encode(), hashlib.sha256).hexdigest()
        return f"HS256.{payload_b64}.{sig}"
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def decode_access_token(token: str) -> dict[str, Any]:
    try:
        from jose import jwt, JWTError
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            return payload
        except JWTError:
            raise
    except Exception:
        # fallback for simple HMAC token format: HS256.<payload_b64>.<sig>
        try:
            import base64
            import hmac
            import hashlib

            parts = token.split('.')
            if len(parts) != 3 or parts[0] != 'HS256':
                raise ValueError('Invalid token format')
            payload_b64 = parts[1]
            sig = parts[2]
            expected = hmac.new(SECRET_KEY.encode(), payload_b64.encode(), hashlib.sha256).hexdigest()
            if not hmac.compare_digest(expected, sig):
                raise ValueError('Invalid token signature')
            padded = payload_b64 + '=' * (-len(payload_b64) % 4)
            payload_json = base64.urlsafe_b64decode(padded.encode()).decode()
            payload = json.loads(payload_json)
            # check expiry
            if int(payload.get('exp', 0)) < int(datetime.utcnow().timestamp()):
                raise ValueError('Token expired')
            return payload
        except Exception as exc:
            raise
