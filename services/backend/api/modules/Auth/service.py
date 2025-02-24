""" Module for the controllers of the auth api """

import json
import os
from fastapi import Depends
from typing_extensions import Annotated
from datetime import datetime
from uuid import UUID
from .repository import UserRepository, get_user_repo

class AuthService:
    """Conotroller functions for User table"""

    def __init__(self, user_repo: UserRepository = Depends(get_user_repo)):
        """Initialize the service"""

        self.user_repo = user_repo


    def get_user_by_id(self, user_id: UUID):
        """Return a user by id"""

        return self.user_repo.get_by_id(user_id)


AuthServiceDep = Annotated[
    AuthService,
    Depends(AuthService)
]
