import asyncio
import json
from api.modules.SSE.models import TimesTableResponse

async def get_times_table(number: int):
    """Return the times table for the given number"""
    
    for i in range(1, 11):
        # Create response object
        response = TimesTableResponse(
            table=f"{number} x {i} = {number * i}",
            progress=(i * 10) / 100
        )
        print(response.json())
        # Format as SSE message
        yield f"data: {response.json()}\n\n"
        await asyncio.sleep(1)  # simulate a delay