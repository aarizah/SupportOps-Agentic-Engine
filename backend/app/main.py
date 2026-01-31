from fastapi import FastAPI
from app.modules.chat.router import router as chat_router
from fastapi.middleware.cors import CORSMiddleware
from app.core.settings import settings

app= FastAPI()
app.title="SupportOps Agents"

app.add_middleware(CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],)

app.include_router(chat_router)


@app.get("/")
def home():
    return "welcome to my application"
