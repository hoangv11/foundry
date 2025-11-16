from fastapi import APIRouter, HTTPException
from ..models.docs import LegalDocsInput, LegalDocsOutput
from ..agents.legal_service import generate_legal_docs

router = APIRouter(prefix="/api/legal", tags=["legal"])

@router.post("/generate", response_model=LegalDocsOutput)
async def generate_legal_documents(input: LegalDocsInput):
    """
    Generate legal documents (Privacy Policy, Terms of Use, NDA) for a business idea.
    """
    try:
        result = generate_legal_docs(input.dict())
        return LegalDocsOutput(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating legal documents: {str(e)}")

@router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "legal"}
