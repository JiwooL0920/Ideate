"""API Endpoints for Project1"""

from fastapi import APIRouter, Request

router = APIRouter(prefix="", tags=["project1"])


@router.get("")
def project1(request: Request):
    return {"message": "Project1 API"}


