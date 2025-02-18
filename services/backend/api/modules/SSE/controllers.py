import asyncio
import json
from api.modules.SSE.models import TimesTableResponse
from config.logger import logger


async def get_times_table(number: int):
    """Return the times table for the given number in SSE format"""
    logger.info(f"New SSE connection established for number: {number}")
    
    try:
        total_items = number * number
        current_item = 0
        
        yield "event: connected\ndata: Connection established\n\n"
        
        for n in range(1, number+1):
            for i in range(1, number+1):
                try:
                    current_item += 1
                    response = TimesTableResponse(
                        number=n,
                        i=i,
                        result=n*i,
                    )
                    yield f"event: progress\ndata: {(current_item/total_items)*100}\n\n"
                    print(f"data: {response.json()}\n\n")
                    yield f"data: {response.json()}\n\n"
                    await asyncio.sleep(0.05)  # Small delay to prevent overwhelming
                except ConnectionResetError:
                    logger.warning("Client disconnected, attempting to maintain state")
                    await asyncio.sleep(1)  # Wait before retry
                    continue

        yield "event: complete\ndata: Stream completed\n\n"
        logger.info(f"SSE stream completed for number: {number}")
        
    except Exception as e:
        logger.error(f"Error in SSE stream for number {number}: {str(e)}")
        yield f"event: error\ndata: {str(e)}\n\n"
    

    finally:
        logger.info(f"SSE connection closed for number: {number}")

