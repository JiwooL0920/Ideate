"""Table for chatapp"""

import uuid

from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from database.entities.base import Base


from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY


class ChatAppSessionsEntity(Base):
    """ChatAppSessionstable"""

    __tablename__ = "chatapp_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("user.id"), nullable=False)
    created_datetime = Column(DateTime)
    updated_datetime = Column(DateTime)
