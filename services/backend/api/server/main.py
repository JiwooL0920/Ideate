"""Entrypoint to FastAPI application."""

import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.modules.WebSocket import websocket_router
from api.modules.SSE import sse_router


env = os.getenv("ENV", "local")

app = FastAPI()
app.include_router(websocket_router, prefix="/websocket", tags=["WebSocket"])
app.include_router(sse_router, prefix="/sse", tags=["SSE"])

origins = ["http://localhost:3000", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

# For deployment only
if not env == "local":
    app.mound("/static", StaticFiles(directory="frontend/build"), name="static")
