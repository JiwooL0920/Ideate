"""Module for user table repository"""

from datetime import datetime, timedelta
from typing import Dict, Union, Optional
from uuid import UUID, uuid4

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from database.entities.schemas.user import UserEntity
from .utils.repository import Repository


class UserRepository(Repository):
    """Repository class for User entities"""

    def __init__(self, session: AsyncSession):
        """Initialize the repository"""

        super().__init__(session)

    async def get_by_id(self, user_id: UUID):
        """Return a user by id"""

        result = (
            (await self.execute(select(UserEntity).where(UserEntity.id == user_id)))
            .scalars()
            .one_or_none()
        )

        if not result:
            return None
        
        print("result: ", result)

