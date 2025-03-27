"""Service functions for PokeGPT"""

from typing import List, Annotated
from uuid import UUID
from fastapi import Depends 

from .repository import PokeGPTSessionsRepository, get_pokegpt_sessions_repo
from database.entities.schemas.pokegpt.pokegpt_sessions import PokeGPTSessionsEntity


class PokeGPTService:
    """Service functions for PokeGPTSessions table"""

    def __init__(self, sessions_repo: PokeGPTSessionsRepository = Depends(get_pokegpt_sessions_repo)):
        self.sessions_repo = sessions_repo

    async def get_all_sessions(self) -> List[PokeGPTSessionsEntity]:
        """Get all sessions"""
        return await self.sessions_repo.get_all()

    async def get_sessions_by_user_id(self, user_id: UUID) -> List[PokeGPTSessionsEntity]:
        """Get all sessions for a specific user"""
        return await self.sessions_repo.get_by_user_id(user_id)


PokeGPTServiceDep = Annotated[
    PokeGPTService,
    Depends(PokeGPTService)
] 