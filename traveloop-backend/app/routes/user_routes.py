from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api", tags=["users"])


class SignupPayload(BaseModel):
    full_name: str
    email: str
    password: str


class LoginPayload(BaseModel):
    email: str
    password: str


users_db = {}


@router.get("/users")
def get_users():
    return {
        "users": [
            {
                "full_name": user["full_name"],
                "email": user["email"],
            }
            for user in users_db.values()
        ]
    }


@router.get("/health")
def health_check():
    return {"status": "ok"}


@router.post("/auth/signup", status_code=201)
def signup(payload: SignupPayload):
    email = payload.email.strip().lower()

    if not payload.full_name.strip():
        raise HTTPException(
            status_code=400,
            detail="Full name is required.",
        )

    if not email:
        raise HTTPException(
            status_code=400,
            detail="Email is required.",
        )

    if len(payload.password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 6 characters long.",
        )

    if email in users_db:
        raise HTTPException(
            status_code=409,
            detail="An account with this email already exists.",
        )

    user = {
        "full_name": payload.full_name.strip(),
        "email": email,
        "password": payload.password,
    }
    users_db[email] = user

    return {
        "message": "Account created successfully.",
        "user": {
            "full_name": user["full_name"],
            "email": user["email"],
        },
    }


@router.post("/auth/login")
def login(payload: LoginPayload):
    email = payload.email.strip().lower()
    user = users_db.get(email)

    if user is None or user["password"] != payload.password:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    return {
        "message": "Login successful.",
        "user": {
            "full_name": user["full_name"],
            "email": user["email"],
        },
    }
