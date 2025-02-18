import asyncio
import json
from api.modules.SSE.models import TimesTableResponse

async def get_times_table(number: int):
    """Return the times table for the given number"""

    for n in range(1, number+1):
        for i in range(1, 11):
            response = TimesTableResponse(
                number=n,
                i=i,
                result=n*i,
            )
            print(response.json())
            yield response.json()
            await asyncio.sleep(1)

