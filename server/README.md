# Foundry Server

FastAPI backend providing AI-powered business automation services including branding, legal document generation, Shopify integration, and customer support.

## Features

- **Branding Service**: Generate logos, taglines, brand names, and promotional videos
- **Legal Document Generation**: Auto-generate Privacy Policies, Terms of Service, and NDAs
- **Shopify Integration**: OAuth authentication and Admin API access
- **Customer Support**: Email webhook integration for automated support responses
- **CORS Enabled**: Ready for frontend integration

## Setup

### 1. Create and activate virtual environment
```bash
cd server
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

Create `.env` file in `server/` directory:
```ini
# Server Configuration
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

# Shopify Integration
SHOPIFY_API_KEY=your_public_api_key
SHOPIFY_API_SECRET=your_private_api_secret
SHOPIFY_SCOPES=read_products,write_products,read_themes,write_themes,read_customers,read_orders

# AI Service API Keys
OPENAI_API_KEY=your_openai_api_key
GOOGLE_API_KEY=your_google_api_key

# Email Configuration (for support service)
EMAIL_DOMAIN=your_email_domain
EMAIL_API_KEY=your_email_api_key

# AWS (for video/asset storage)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key

# Supabase (database)
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### 4. Run the server
```bash
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

Server runs at `http://localhost:8000`

## API Endpoints

### Core
- `GET /` - API information and available endpoints
- `GET /health` - Health check endpoint

### Brand Services
- `POST /api/brand/generate` - Generate branding assets (name, logo, tagline)
  ```json
  {
    "idea_string": "AI-powered fitness tracking app for seniors"
  }
  ```
- `POST /api/brand/generate-video` - Generate promotional brand video
- `GET /api/brand/health` - Brand service health check

### Legal Services
- `POST /api/legal/generate` - Generate legal documents
  ```json
  {
    "business_name": "TechCorp LLC",
    "industry": "Technology",
    "state": "Delaware"
  }
  ```
- `GET /api/legal/health` - Legal service health check

### Shopify Integration
- `GET /api/shopify/auth?shop={shop_domain}` - Initiate OAuth flow
- `GET /api/shopify/callback` - OAuth callback handler
- `GET /api/shopify/products?shop={shop}` - List products
- `POST /api/shopify/products?shop={shop}` - Create product
- `GET /api/shopify/themes?shop={shop}` - List themes
- `PUT /api/shopify/themes/assets?shop={shop}` - Update theme assets
- `POST /api/shopify/webhooks` - Shopify webhook receiver

### Support Services
- `POST /email/webhook` - Email webhook for automated support responses

## Project Structure

```
server/
├── src/
│   ├── main.py                 # FastAPI application entry point
│   ├── agents/
│   │   ├── brand_service.py    # Branding generation logic
│   │   ├── legal_service.py    # Legal document generation
│   │   ├── support_service.py  # Customer support automation
│   │   └── video.py            # Video generation utilities
│   ├── models/
│   │   ├── branding.py         # Branding data models
│   │   ├── docs.py             # Legal document models
│   │   └── video.py            # Video data models
│   ├── routes/
│   │   ├── brand.py            # Brand API endpoints
│   │   ├── legal.py            # Legal API endpoints
│   │   └── shopify.py          # Shopify API endpoints
│   └── utils/
│       ├── create_gemini.py    # Google Gemini AI client
│       ├── create_openai.py    # OpenAI client
│       ├── email_agent_domain.py
│       └── email_agent_setup.py
├── requirements.txt
└── README.md
```

## Development

### Running in development mode
```bash
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

### API Documentation
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Tech Stack

- **Framework**: FastAPI
- **AI/ML**: OpenAI GPT, Google Gemini
- **Integrations**: Shopify Admin API, AgentMail
- **Storage**: AWS S3, Supabase
- **Document Generation**: WeasyPrint (PDF generation)
- **Video Processing**: Custom video generation pipeline

## Notes

- Shopify access tokens are stored in-memory for development. Implement database persistence for production.
- Email webhooks require proper domain configuration via AgentMail
- Video generation may require additional system dependencies for WeasyPrint
