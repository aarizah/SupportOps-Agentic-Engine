from fastapi import APIRouter, Depends
from app.modules.chat.schemas import IncomingMessage
from app.modules.chat.services import ChatService

router=APIRouter(prefix="/chat",tags=["Chat with AI"])

def get_AIChatService()-> ChatService:
    return ChatService()

@router.post("/message",tags=["Messages"])
def new_message(message:IncomingMessage, service:ChatService=Depends(get_AIChatService)):
    answer=service.answer_query(message)
    return message

