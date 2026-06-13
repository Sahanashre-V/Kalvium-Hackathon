from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict


class ORMModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)


JsonDict = dict[str, Any]
JsonList = list[JsonDict]


class Timestamped(ORMModel):
    created_at: datetime
