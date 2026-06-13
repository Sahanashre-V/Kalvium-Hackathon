from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session as DbSession

from app.database import get_db
from app.models import Session
from app.schemas import SessionCreate, SessionRead
from app.services.crud import CRUDService


router = APIRouter(prefix="/sessions", tags=["sessions"])
service = CRUDService[Session, SessionCreate](Session)


@router.get("/", response_model=list[SessionRead])
def list_sessions(skip: int = 0, limit: int = 100, db: DbSession = Depends(get_db)):
    return service.list(db, skip, limit)


@router.post("/", response_model=SessionRead, status_code=status.HTTP_201_CREATED)
def create_session(payload: SessionCreate, db: DbSession = Depends(get_db)):
    return service.create(db, payload)


@router.get("/{session_id}", response_model=SessionRead)
def get_session(session_id: int, db: DbSession = Depends(get_db)):
    session = service.get(db, session_id)
    if session is None:
        raise HTTPException(status_code=404, detail="Session not found")
    return session
