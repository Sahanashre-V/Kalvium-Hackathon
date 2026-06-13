from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session as DbSession
import os

from app.database import get_db
from app.models import User
from app.services.auth import get_password_hash, verify_password, create_access_token
from app.schemas import UserCreate, UserRead

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def signup(payload: UserCreate, db: DbSession = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=409, detail="Email already exists")
    data = payload.model_dump(exclude={"password"})
    data["hashed_password"] = get_password_hash(payload.password or "")
    user = User(**data)
    try:
        db.add(user)
        db.commit()
        db.refresh(user)
    except Exception:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed creating user")
    return user


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


@router.post("/login")
def login(payload: LoginRequest, db: DbSession = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or user.hashed_password is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if verify_password(payload.password, user.hashed_password):
        # upgrade legacy plain-text to hashed
        if not user.hashed_password.startswith("$2"):
            user.hashed_password = get_password_hash(payload.password)
            db.add(user)
            db.commit()
            db.refresh(user)
        token = create_access_token(subject=user.id)
        return {"access_token": token, "token_type": "bearer", "expires_in": int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "1440")) * 60}
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
