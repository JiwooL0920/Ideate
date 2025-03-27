"""Table for pokegpt sessions"""
import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from database.entities.base import Base


class PokeGPTSessionsEntity(Base):
    """PokeGPTSessions table"""

    __tablename__ = "pokegpt_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("user.id"), nullable=False)
    created_datetime = Column(DateTime)
    updated_datetime = Column(DateTime)
