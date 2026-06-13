from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session as DbSession

from app.database import get_db
from app.models import Roadmap
from app.schemas import RoadmapCreate, RoadmapRead
from app.services.crud import CRUDService


router = APIRouter(prefix="/roadmaps", tags=["roadmaps"])
service = CRUDService[Roadmap, RoadmapCreate](Roadmap)


@router.get("/", response_model=list[RoadmapRead])
def list_roadmaps(skip: int = 0, limit: int = 100, db: DbSession = Depends(get_db)):
    return service.list(db, skip, limit)


@router.post("/", response_model=RoadmapRead, status_code=status.HTTP_201_CREATED)
def create_roadmap(payload: RoadmapCreate, db: DbSession = Depends(get_db)):
    return service.create(db, payload)


@router.get("/{roadmap_id}", response_model=RoadmapRead)
def get_roadmap(roadmap_id: int, db: DbSession = Depends(get_db)):
    roadmap = service.get(db, roadmap_id)
    if roadmap is None:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    return roadmap
