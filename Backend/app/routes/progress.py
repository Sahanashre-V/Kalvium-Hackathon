from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session as DbSession

from app.database import get_db
from app.models import Progress
from app.schemas import ProgressCreate, ProgressRead
from app.services.crud import CRUDService


router = APIRouter(prefix="/progress", tags=["progress"])
service = CRUDService[Progress, ProgressCreate](Progress)


@router.get("/", response_model=list[ProgressRead])
def list_progress(skip: int = 0, limit: int = 100, db: DbSession = Depends(get_db)):
    return service.list(db, skip, limit)


@router.post("/", response_model=ProgressRead, status_code=status.HTTP_201_CREATED)
def create_progress(payload: ProgressCreate, db: DbSession = Depends(get_db)):
    return service.create(db, payload)


@router.get("/{progress_id}", response_model=ProgressRead)
def get_progress(progress_id: int, db: DbSession = Depends(get_db)):
    progress = service.get(db, progress_id)
    if progress is None:
        raise HTTPException(status_code=404, detail="Progress not found")
    return progress
