"""API Endpoints for Project2"""

from fastapi import APIRouter, Request

router = APIRouter(prefix="", tags=["project2"])

@router.get("")
def project2(request: Request):
    return {"message": "Project2 API"}

