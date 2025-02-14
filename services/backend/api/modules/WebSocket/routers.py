"""API Endpoints for WebSocket"""

from fastapi import APIRouter, Request

router = APIRouter(prefix="", tags=["WebSocket"])


@router.get("/health")
def project1(request: Request):
    return {"message": "WebsSocket API"}


