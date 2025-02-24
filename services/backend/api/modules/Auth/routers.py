"""API Endpoints for Auth"""

from uuid import UUID
from fastapi import APIRouter, Request
from .service import AuthServiceDep


router = APIRouter(prefix="", tags=["Auth"])

@router.get("/health")
def auth_health(request: Request):
    return {"message": "Auth API"}


@router.get("/users/{user_id}")
async def get_user(
    user_id: UUID,
    auth_service: AuthServiceDep = None
):
    user = await auth_service.get_user_by_id(user_id)
    print("user: ", user)
    return {"user": user}


