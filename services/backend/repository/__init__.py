"""Import repositories"""
import asyncio
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from .utils.sqlalchemy_session import get_async_db_session

from .user_repository import UserRepository


def get_user_repo(
    session: AsyncSession = Depends(get_async_db_session)
) -> UserRepository:
    """Returns an instance of the UserRepository"""
    return UserRepository(session=session)
