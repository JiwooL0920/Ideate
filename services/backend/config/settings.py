"""Global settings for backend"""

import os
import logging
from pathlib import Path
from typing import Any, Dict, List, Optional
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv(dotenv_path=Path(__file__).parent / ".env")

# pylint: disable=too-few-public-methods
class Settings(BaseSettings):
    """Application settings"""

    # ROOT_DIR: Path = Path(__file__).parent.parent / "api"

    ENV: str = os.getenv("ENV", "dev")
    DEV_MODE: bool = True
    TEST_MODE: bool = False

    PROJECT_NAME: str = os.getenv("PROJECT_NAME")
    LOCAL_REPO_PATH: Optional[str] = os.getenv("LOCAL_REPO_PATH")

    POSTGRES_HOST: str = os.getenv("POSTGRES_HOST")
    POSTGRES_PORT: int = os.getenv("POSTGRES_PORT", 5432)
    POSTGRES_DB: str = os.getenv("POSTGRES_DB")
    IDEATE_SCHEMA: str = os.getenv("IDEATE_SCHEMA", "dev")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD")

    POSTGRES_CONNECTION_STRING: str = os.getenv("POSTGRES_CONNECTION_STRING")
    ASYNC_POSTGRES_CONNECTION_STRING: str = os.getenv("ASYNC_POSTGRES_CONNECTION_STRING")

    class Config:
        """Loads the env vars from a dotenv file"""

        env_file = ".env"

# initialize once
settings = Settings()
print(settings.POSTGRES_CONNECTION_STRING)