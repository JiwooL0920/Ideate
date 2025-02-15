"""API Endpoints for SSE"""

from fastapi import APIRouter, Request

router = APIRouter(prefix="", tags=["SSE"])

@router.get("/health")
def health(request: Request):
    return {"message": "SSE API"}


