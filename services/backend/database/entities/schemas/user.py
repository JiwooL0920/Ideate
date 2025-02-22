"""User table sqlalchemy model class"""

import uuid

from sqlalchemy import Column, String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from database.entities.base import Base


class UserEntity(Base):
    """User table"""

    __tablename__ = "user"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    created_datetime = Column(DateTime)
    updated_datetime = Column(DateTime)
    last_online = Column(DateTime)
    is_active = Column(Boolean, default=False)
