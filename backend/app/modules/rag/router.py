from fastapi import APIRouter

router= APIRouter(tags="Ingestion and Documents")

@router.get("/document")
def get_document():
    return 