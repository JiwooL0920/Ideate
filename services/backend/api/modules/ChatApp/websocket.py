"""WebSocket handler for ChatApp"""

from fastapi import WebSocket, WebSocketDisconnect
from typing import Dict, List
import json
import uuid
import asyncio

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        self.active_connections[user_id] = websocket
        print(f"Client connected: {user_id}")

    def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
            print(f"Client disconnected: {user_id}")

    async def send_message(self, message: str, user_id: str):
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections.values():
            await connection.send_text(message)

manager = ConnectionManager()

async def handle_websocket(websocket: WebSocket):
    try:
        # Accept the connection first
        await websocket.accept()
        
        # Wait for the message
        data = await websocket.receive_text()
        message_data = json.loads(data)
        
        user_id = message_data.get("userId")
        if not user_id:
            user_id = str(uuid.uuid4())
        
        # Simulate processing delay
        await asyncio.sleep(3)
        
        # Send dummy response
        await websocket.send_text(json.dumps({
            "messageId": message_data.get("messageId", ""),
            "question": message_data.get("question", ""),
            "answer": "dummy response"
        }))
        
        # Close the connection after sending response
        await websocket.close()

    except Exception as e:
        print(f"Error in WebSocket handler: {e}")
        try:
            await websocket.close()
        except:
            pass 