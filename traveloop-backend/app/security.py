import hashlib
import hmac
import secrets

PBKDF2_ITERATIONS = 100_000


def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    hashed = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        PBKDF2_ITERATIONS,
    ).hex()
    return (
        f"pbkdf2_sha256${PBKDF2_ITERATIONS}$"
        f"{salt}${hashed}"
    )


def verify_password(
    password: str, password_hash: str
) -> bool:
    algorithm, iterations, salt, hashed = (
        password_hash.split("$", 3)
    )

    if algorithm != "pbkdf2_sha256":
        return False

    candidate = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        int(iterations),
    ).hex()
    return hmac.compare_digest(candidate, hashed)
