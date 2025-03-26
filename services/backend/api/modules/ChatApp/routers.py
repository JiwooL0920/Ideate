"""API Endpoints for ChatApp"""

from fastapi import APIRouter, Request
from typing import List
from uuid import UUID

from .service import ChatAppServiceDep
from .models import SessionResponse

router = APIRouter(prefix="", tags=["ChatApp"])


@router.get("/health")
def chatapp_health(request: Request):
    return {"message": "ChatApp API"}


@router.get("/sessions", response_model=List[SessionResponse])
async def get_all_sessions(
    chat_app_service: ChatAppServiceDep = None
):
    """Get all chat app sessions"""
    sessions = await chat_app_service.get_all_sessions()
    return sessions


@router.get("/sessions/{user_id}", response_model=List[SessionResponse])
async def get_sessions_by_user_id(
    user_id: UUID,
    chat_app_service: ChatAppServiceDep = None
):
    """Get all sessions for a specific user"""
    sessions = await chat_app_service.get_sessions_by_user_id(user_id)
    return sessions

