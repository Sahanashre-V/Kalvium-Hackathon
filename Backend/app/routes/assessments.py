from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session as DbSession

from app.database import get_db
from app.models import Assessment
from app.schemas import AssessmentCreate, AssessmentRead
from app.services.crud import CRUDService


router = APIRouter(prefix="/assessments", tags=["assessments"])
service = CRUDService[Assessment, AssessmentCreate](Assessment)


@router.get("/", response_model=list[AssessmentRead])
def list_assessments(skip: int = 0, limit: int = 100, db: DbSession = Depends(get_db)):
    return service.list(db, skip, limit)


@router.post("/", response_model=AssessmentRead, status_code=status.HTTP_201_CREATED)
def create_assessment(payload: AssessmentCreate, db: DbSession = Depends(get_db)):
    return service.create(db, payload)


@router.get("/{assessment_id}", response_model=AssessmentRead)
def get_assessment(assessment_id: int, db: DbSession = Depends(get_db)):
    assessment = service.get(db, assessment_id)
    if assessment is None:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return assessment
