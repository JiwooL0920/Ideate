"""Module for the controllers of the chat app api"""

from fastapi import Depends, HTTPException
from typing import List
from typing_extensions import Annotated
from uuid import UUID

from .repository import ChatAppSessionsRepository, get_chatapp_sessions_repo
from database.entities.schemas.chatapp.chatapp_sessions import ChatAppSessionsEntity


class ChatAppService:
    """Service functions for ChatAppSessions table"""

    def __init__(self, sessions_repo: ChatAppSessionsRepository = Depends(get_chatapp_sessions_repo)):
        """Initialize the service"""
        self.sessions_repo = sessions_repo

    async def get_all_sessions(self) -> List[ChatAppSessionsEntity]:
        """Return all sessions"""
        return await self.sessions_repo.get_all()

    async def get_sessions_by_user_id(self, user_id: UUID) -> List[ChatAppSessionsEntity]:
        """Return all sessions for a specific user"""
        sessions = await self.sessions_repo.get_by_user_id(user_id)
        
        if not sessions:
            raise HTTPException(
                status_code=404,
                detail=f"No sessions found for user with ID: {user_id}"
            )
        
        return sessions


ChatAppServiceDep = Annotated[
    ChatAppService,
    Depends(ChatAppService)
] 