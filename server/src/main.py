from fastapi import FastAPI, Request # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from src.utils.email_agent_setup import email_setup
from src.agents.support_service import respond_to_support_email
from urllib.parse import urlencode
from .routes.shopify import router as shopify_router
from .routes.legal import router as legal_router
from .routes.brand import router as brand_router

# Load environment variables if .env present
try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

app = FastAPI(title="Foundry API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    print("Starting up...")
    email_setup()

app.include_router(shopify_router)
app.include_router(legal_router)
app.include_router(brand_router)

@app.get("/")
async def root():
    return {
        "message": "Welcome to Foundry API",
        "version": "1.0.0",
        "endpoints": {
            "brand": "/api/brand/*",
            "legal": "/api/legal/*",
            "shopify": "/api/shopify/*",
            "support": "/api/support/* (webhook)",
            "docs": "/docs"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/email/webhook")
async def email_webhook(request: Request):
    body = await request.body()
    respond_to_support_email(body)
    return {"status": "received"}

if __name__ == "__main__":
    import uvicorn # type: ignore
    uvicorn.run(app, host="0.0.0.0", port=8000)
