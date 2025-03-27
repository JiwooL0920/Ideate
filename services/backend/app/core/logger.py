import logging
import json
import socket
from datetime import datetime
from typing import Any, Dict
from pythonjsonlogger import jsonlogger
import logging.handlers
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.log import Log

class CustomJsonFormatter(jsonlogger.JsonFormatter):
    def add_fields(self, log_record: Dict[str, Any], record: logging.LogRecord, message_dict: Dict[str, Any]) -> None:
        super(CustomJsonFormatter, self).add_fields(log_record, record, message_dict)
        log_record['timestamp'] = datetime.utcnow().isoformat()
        log_record['level'] = record.levelname
        log_record['hostname'] = socket.gethostname()

def setup_logger() -> logging.Logger:
    logger = logging.getLogger('backend')
    
    # Console handler
    console_handler = logging.StreamHandler()
    console_formatter = CustomJsonFormatter('%(timestamp)s %(level)s %(name)s %(message)s')
    console_handler.setFormatter(console_formatter)
    logger.addHandler(console_handler)
    
    # TCP handler for ELK
    tcp_handler = logging.handlers.SocketHandler('logstash', 5000)
    tcp_formatter = CustomJsonFormatter('%(timestamp)s %(level)s %(name)s %(message)s')
    tcp_handler.setFormatter(tcp_formatter)
    logger.addHandler(tcp_handler)
    
    logger.setLevel(logging.INFO)
    return logger

async def log_to_db(db: AsyncSession, level: str, message: str, metadata: Dict[str, Any] = None) -> None:
    """
    Log message to PostgreSQL database
    """
    log = Log(
        level=level,
        message=message,
        metadata=metadata or {}
    )
    db.add(log)
    await db.commit()
    await db.refresh(log)

logger = setup_logger() 