from pydantic import BaseModel
from datetime import datetime

class IncomingMessage(BaseModel):
    conversation_id: int
    content:str
