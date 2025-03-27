"""Global settings for backend"""

import os
import logging
from pathlib import Path
from typing import Any, Dict, List, Optional
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv(dotenv_path=Path(__file__).parent.parent / ".env")

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
    POSTGRES_PORT: int = int(os.getenv("POSTGRES_PORT", "5432"))
    POSTGRES_DB: str = os.getenv("POSTGRES_DB")
    IDEATE_SCHEMA: str = os.getenv("IDEATE_SCHEMA", "dev")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD")

    def get_postgres_connection_string(self) -> str:
        """Get the PostgreSQL connection string with expanded variables"""
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    def get_async_postgres_connection_string(self) -> str:
        """Get the async PostgreSQL connection string with expanded variables"""
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    class Config:
        """Loads the env vars from a dotenv file"""
        env_file = ".env"
        extra = "allow"

# initialize once
settings = Settings()