from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base


class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    #tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False, index=True)
    #customer_user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    #status = Column(String(50), nullable=False, default="open", index=True)  # open, waiting_for_human, closed
    #created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    #closed_at = Column(DateTime(timezone=True), nullable=True)


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    #sender_user_id = Column(Integer, ForeignKey("users.id"), nullable=True, index=True)
    #tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=False, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"), nullable=False, index=True)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    sender_type = Column(String(20), nullable=False, index=True)  # ai, client, operator