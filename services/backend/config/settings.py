"""Global settings for backend"""

import logging
from pathlib import Path
from typing import Any, Dict, List, Optional
from pydantic import BaseSettings

# pylint: disable=too-few-public-methods
class Settings(BaseSettings):
    """Application settings"""

    ROOT_DIR: Path = Path(__file__).parent.parent / "api"

    APP_ENV: str = os.getenv("ENV", "local")
    DEV_MODE: bool = APP_ENV == "local"
    TEST_MODE: bool = False

    class Config:
        """Loads the env vars from a dotenv file"""

        env_file = ".env"
