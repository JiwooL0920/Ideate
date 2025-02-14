"""API Endpoints for SSE"""

from fastapi import APIRouter, Request

router = APIRouter(prefix="", tags=["SSE"])

@router.get("/health")
def project2(request: Request):
    return {"message": "SSE API"}

