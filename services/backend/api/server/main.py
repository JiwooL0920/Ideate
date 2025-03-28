"""Entrypoint to FastAPI application."""

import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.settings import settings

from api.modules.SSE import sse_router
from api.modules.Auth import auth_router
from api.modules.PokeGPT import pokegpt_router



env = settings.ENV

app = FastAPI()
app.include_router(sse_router, prefix="/sse", tags=["SSE"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(pokegpt_router, prefix="/pokegpt", tags=["PokeGPT"])

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
if not env == "dev":
    app.mount("/static", StaticFiles(directory="frontend/build"), name="static")
