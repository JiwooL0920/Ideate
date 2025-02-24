"""API Endpoints for ChatApp"""

from fastapi import APIRouter, Request

router = APIRouter(prefix="", tags=["ChatApp"])


@router.get("/health")
def chatapp_health(request: Request):
    return {"message": "ChatApp API"}

