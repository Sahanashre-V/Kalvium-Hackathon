from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session as DbSession

from app.database import get_db
from app.models import Analysis
from app.schemas import AnalysisCreate, AnalysisRead
from app.services.crud import CRUDService


router = APIRouter(prefix="/analyses", tags=["analyses"])
service = CRUDService[Analysis, AnalysisCreate](Analysis)


@router.get("/", response_model=list[AnalysisRead])
def list_analyses(skip: int = 0, limit: int = 100, db: DbSession = Depends(get_db)):
    return service.list(db, skip, limit)


@router.post("/", response_model=AnalysisRead, status_code=status.HTTP_201_CREATED)
def create_analysis(payload: AnalysisCreate, db: DbSession = Depends(get_db)):
    return service.create(db, payload)


@router.get("/{analysis_id}", response_model=AnalysisRead)
def get_analysis(analysis_id: int, db: DbSession = Depends(get_db)):
    analysis = service.get(db, analysis_id)
    if analysis is None:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return analysis
