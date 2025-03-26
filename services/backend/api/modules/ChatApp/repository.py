"""Module for chat app sessions repository"""

from fastapi import Depends
from typing import List
from uuid import UUID
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.entities.schemas.chatapp.chatapp_sessions import ChatAppSessionsEntity
from database.utils.sqlalchemy_session import get_async_db_session
from api.utils.repository import Repository


class ChatAppSessionsRepository(Repository):
    """Repository class for ChatAppSessions entities"""

    def __init__(self, session: AsyncSession):
        """Initialize the repository"""
        super().__init__(session)

    async def get_all(self) -> List[ChatAppSessionsEntity]:
        """Return all sessions"""
        result = await self.execute(select(ChatAppSessionsEntity))
        return result.scalars().all()

    async def get_by_user_id(self, user_id: UUID) -> List[ChatAppSessionsEntity]:
        """Return all sessions for a specific user"""
        result = await self.execute(
            select(ChatAppSessionsEntity).where(ChatAppSessionsEntity.user_id == user_id)
        )
        return result.scalars().all()


def get_chatapp_sessions_repo(
    session: AsyncSession = Depends(get_async_db_session),
) -> ChatAppSessionsRepository:
    """Return a chat app sessions repository"""
    return ChatAppSessionsRepository(session=session) 