"""Pydantic models for ChatApp"""

from typing import List
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel


class SessionResponse(BaseModel):
    id: UUID
    user_id: UUID
    created_datetime: datetime
    updated_datetime: datetime

    class Config:
        from_attributes = True
