from typing import Generic, TypeVar

from pydantic import BaseModel
from sqlalchemy.orm import Session as DbSession

from app.database import Base


ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)


class CRUDService(Generic[ModelType, CreateSchemaType]):
    def __init__(self, model: type[ModelType]) -> None:
        self.model = model

    def list(self, db: DbSession, skip: int = 0, limit: int = 100) -> list[ModelType]:
        return db.query(self.model).offset(skip).limit(limit).all()

    def get(self, db: DbSession, item_id: int) -> ModelType | None:
        return db.get(self.model, item_id)

    def create(self, db: DbSession, data: CreateSchemaType) -> ModelType:
        values = data.model_dump()
        item = self.model(**values)
        db.add(item)
        db.commit()
        db.refresh(item)
        return item
