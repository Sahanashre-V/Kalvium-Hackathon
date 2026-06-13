from datetime import datetime

from pydantic import BaseModel

from app.schemas.base import ORMModel


class SessionBase(BaseModel):
    user_id: int
    topic: str
    goal: str | None = None
    status: str = "active"


class SessionCreate(SessionBase):
    pass


class SessionRead(SessionBase, ORMModel):
    id: int
    created_at: datetime
    updated_at: datetime
