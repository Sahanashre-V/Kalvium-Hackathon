from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session as DbSession

from app.database import get_db
from app.models import Progress, User
from app.schemas import ProgressCreate, ProgressRead
from app.services.crud import CRUDService
from app.dependencies import get_current_user


router = APIRouter(prefix="/progress", tags=["progress"])
service = CRUDService[Progress, ProgressCreate](Progress)


@router.get("/", response_model=list[ProgressRead])
def list_progress(skip: int = 0, limit: int = 100, db: DbSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Progress).filter(Progress.user_id == current_user.id).offset(skip).limit(limit).all()


@router.post("/", response_model=ProgressRead, status_code=status.HTTP_201_CREATED)
def create_progress(payload: ProgressCreate, db: DbSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    data = payload.model_dump(exclude={"user_id"})
    data["user_id"] = current_user.id
    progress = Progress(**data)
    db.add(progress)
    db.commit()
    db.refresh(progress)
    return progress


@router.get("/{progress_id}", response_model=ProgressRead)
def get_progress(progress_id: int, db: DbSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    progress = service.get(db, progress_id)
    if progress is None or progress.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Progress not found")
    return progress
