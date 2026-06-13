from datetime import datetime

from pydantic import BaseModel, EmailStr

from app.schemas.base import ORMModel


class UserBase(BaseModel):
    name: str
    email: EmailStr


class UserCreate(UserBase):
    password: str | None = None


class UserRead(UserBase, ORMModel):
    id: int
    created_at: datetime
