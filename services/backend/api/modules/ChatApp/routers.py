"""API Endpoints for ChatApp"""

from fastapi import APIRouter, Request

router = APIRouter(prefix="", tags=["ChatApp"])


@router.get("/health")
def project1(request: Request):
    return {"message": "ChatApp API"}

