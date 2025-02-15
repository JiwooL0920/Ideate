from pydantic import BaseModel
from typing import List


class TimesTableReqeust(BaseModel):
    """Request model for [POST] /sse"""
    number: int

class TimesTableResponse(BaseModel):
    """Response model for [GET] /sse"""
    progress: float
    table: str 