"""API Endpoints for SSE"""

import asyncio
import json
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from api.modules.SSE.controllers import get_times_table 
from api.modules.SSE.models import TimesTableReqeust

router = APIRouter(prefix="", tags=["SSE"])


@router.get("/health")
def health():
    return {"message": "SSE API"}


@router.post("")
async def stream_events(req: TimesTableReqeust):
    return StreamingResponse(
        get_times_table(req.number),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    )

