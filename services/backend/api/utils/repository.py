"""Base class for repository"""

from sqlalchemy.ext.asyncio import AsyncSession


class Repository:
    """Class for creating/managing queries"""

    def __init__(self, session: AsyncSession):
        """Initialize the repository"""

        self.session = session

    async def execute(self, *args):
        """self.session.execute(*args)"""

        return await self.session.execute(*args)
