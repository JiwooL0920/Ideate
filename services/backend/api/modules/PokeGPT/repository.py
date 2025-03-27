"""Repository functions for PokeGPT"""

from typing import List
from uuid import UUID
from sqlalchemy import select
from fastapi import Depends

from api.utils.repository import Repository
from database.entities.schemas.pokegpt.pokegpt_sessions import PokeGPTSessionsEntity
from database.utils.sqlalchemy_session import get_async_db_session

class PokeGPTSessionsRepository(Repository):
    """Repository class for PokeGPTSessions entities"""

    async def get_all(self) -> List[PokeGPTSessionsEntity]:
        """Get all sessions"""
        result = await self.execute(select(PokeGPTSessionsEntity))
        return result.scalars().all()

    async def get_by_user_id(self, user_id: UUID) -> List[PokeGPTSessionsEntity]:
        """Get all sessions for a specific user"""
        result = await self.execute(
            select(PokeGPTSessionsEntity).where(PokeGPTSessionsEntity.user_id == user_id)
        )
        return result.scalars().all()


def get_pokegpt_sessions_repo(
    session=Depends(get_async_db_session)
) -> PokeGPTSessionsRepository:
    """Get PokeGPTSessions repository"""
    return PokeGPTSessionsRepository(session=session) 