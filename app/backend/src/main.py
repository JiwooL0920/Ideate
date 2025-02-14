"""Entrypoint to FastAPI application."""

import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.modules.project1 import project1_router
from src.modules.project2 import project2_router


env = os.getenv("ENV", "local")

app = FastAPI()
app.include_router(project1_router, prefix="/project1", tags=["project1"])
app.include_router(project2_router, prefix="/project2", tags=["project2"])

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
