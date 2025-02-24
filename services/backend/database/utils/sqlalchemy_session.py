"""Class to interact with SQLAlchemy"""

import os
from sqlalchemy import create_engine, event
from sqlalchemy.engine import URL
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import text
from dotenv import load_dotenv

load_dotenv()

def get_async_session():
    """Return async session maker instance"""

    url = os.getenv("ASYNC_POSTGRES_CONNECTION_STRING")
    print("\n\n\nurl ", url, "\n\n\n")
    engine = create_async_engine(url)
    return sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)


DB_SESSION_MAKER = None


async def get_async_db_session():
    """Return an async session"""

    global DB_SESSION_MAKER

    if DB_SESSION_MAKER is None:
        DB_SESSION_MAKER = get_async_session()

    async with DB_SESSION_MAKER() as session:
        await session.execute(
            text(f"SET search_path TO {os.getenv('IDEATE_SCHEMA')};")
        )
        print("Got session")
        yield session
