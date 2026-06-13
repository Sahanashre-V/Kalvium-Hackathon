from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session as DbSession

from app.database import get_db
from app.models import User
from app.schemas import UserCreate, UserRead
from app.services.crud import CRUDService
from app.services.auth import get_password_hash


router = APIRouter(prefix="/users", tags=["users"])
service = CRUDService[User, UserCreate](User)


@router.get("/", response_model=list[UserRead])
def list_users(skip: int = 0, limit: int = 100, db: DbSession = Depends(get_db)):
    return service.list(db, skip, limit)


@router.post("/", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(payload: UserCreate, db: DbSession = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=409, detail="Email already exists")
    data = payload.model_dump(exclude={"password"})
    data["hashed_password"] = get_password_hash(payload.password or "")
    user = User(**data)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: int, db: DbSession = Depends(get_db)):
    user = service.get(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
