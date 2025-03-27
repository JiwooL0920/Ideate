"""API Endpoints for PokeGPT"""

from fastapi import APIRouter, Request, WebSocket
from typing import List
from uuid import UUID

from .service import PokeGPTServiceDep
from .dto import SessionResponse
from .websocket import handle_websocket

router = APIRouter(prefix="", tags=["PokeGPT"])


@router.get("/health")
def pokegpt_health(request: Request):
    return {"message": "PokeGPT API"}


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await handle_websocket(websocket)


@router.get("/sessions", response_model=List[SessionResponse])
async def get_all_sessions(
    poke_gpt_service: PokeGPTServiceDep = None
):
    """Get all poke gpt sessions"""
    sessions = await poke_gpt_service.get_all_sessions()
    return sessions


@router.get("/sessions/{user_id}", response_model=List[SessionResponse])
async def get_sessions_by_user_id(
    user_id: UUID,
    poke_gpt_service: PokeGPTServiceDep = None
):
    """Get all sessions for a specific user"""
    sessions = await poke_gpt_service.get_sessions_by_user_id(user_id)
    return sessions

