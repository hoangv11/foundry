# Foundry

AI-powered end-to-end business automation platform that takes entrepreneurs from idea to launch. Foundry combines intelligent agents, real-time market research, and automated workflows to build complete business operations in minutes.

## Overview

Foundry is a comprehensive platform that automates the entire business setup process through three integrated components:

- **Client**: Modern Next.js web application with AI chat interface
- **Server**: FastAPI backend providing AI-powered business services
- **Agents**: Fetch.ai autonomous agents for decentralized business automation

## Key Features

### Full Business Automation

- **Market Research**: AI-powered competitive analysis and trend identification
- **Branding & Identity**: Automated logo, tagline, and brand guideline generation
- **Legal Documentation**: Privacy policies, Terms of Service, and NDA generation
- **E-commerce Setup**: One-click Shopify store creation and product management
- **Marketing Automation**: Ad campaign creation, influencer outreach, and brand videos
- **Customer Support**: AI phone and email assistants with automated responses
- **Investor Relations**: Professional pitch deck generation with financial models

### AI-Powered Workflows

- **Natural Language Interface**: Chat-based business setup and management
- **Context-Aware Tools**: AI agents that understand business context across workflows
- **Real-time Web Search**: Market data and competitor intelligence
- **Multi-modal AI**: Integration with OpenAI GPT and Google Gemini
- **Automated Workflows**: "Full flow" setup that orchestrates all business components

### Enterprise Integrations

- **Shopify**: OAuth authentication, product management, theme customization
- **AgentMail**: Automated email support responses
- **AWS S3**: Asset and video storage
- **Supabase**: Real-time database and authentication
- **Clerk**: User authentication and management

## Quick Start

### Prerequisites

- **Node.js 18+** (for client)
- **Python 3.11+** (for server and agents)
- **Docker** (optional, for containerized deployment)
- **API Keys**: OpenAI, Google AI, Shopify, Clerk, Supabase, AgentVerse

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd foundry
   ```

2. **Setup Client:**

   ```bash
   cd client
   npm install
   cp .env.example .env.local
   # Edit .env.local with your API keys
   npm run dev
   ```

3. **Setup Server:**

   ```bash
   cd server
   python3 -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env
   # Edit .env with your API keys
   uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Setup Agents (Optional):**
   ```bash
   cd agents
   pip install -r requirements.txt
   cp env.example .env
   # Edit .env with your API keys
   python deployment/serve.py
   ```

### Environment Variables

Each component requires specific environment variables. See individual README files for details:

- **Client**: `client/.env.local` - Clerk, Supabase, API endpoints
- **Server**: `server/.env` - OpenAI, Google AI, Shopify, AWS, Supabase
- **Agents**: `agents/.env` - AgentVerse, OpenAI, Google AI, Shopify

## Project Structure

```
foundry/
├── client/                   # Next.js 15 frontend application
│   ├── src/
│   │   ├── app/              # App router pages (dashboard, chat, analytics, etc.)
│   │   ├── components/       # React components (UI, chat, integrations)
│   │   ├── lib/              # AI configuration, tools, utilities
│   │   ├── hooks/            # Custom React hooks
│   │   └── types/            # TypeScript type definitions
│   ├── package.json
│   └── README.md
│
├── server/                   # FastAPI backend services
│   ├── src/
│   │   ├── main.py           # FastAPI application entry point
│   │   ├── agents/           # Business service logic (branding, legal, support)
│   │   ├── models/           # Pydantic data models
│   │   ├── routes/           # API route handlers
│   │   └── utils/            # AI clients and utilities
│   ├── requirements.txt
│   └── README.md
│
├── agents/                   # Fetch.ai uAgents framework
│   ├── deployment/           # Agent deployment utilities
│   ├── advertising/          # Ad campaign agent
│   ├── brand/                # Branding agent
│   ├── ecommerce/            # Shopify store agent
│   ├── investor/             # Pitch deck agent
│   ├── legal/                # Legal docs agent
│   ├── outreach/             # Influencer outreach agent
│   ├── research/             # Market research agent
│   ├── support/              # Customer support agent
│   ├── docker-compose.yml
│   ├── requirements.txt
│   └── README.md
│
├── .gitignore
└── README.md
```

## Component Documentation

### Client (Next.js Frontend)

Modern web application built with:

- **Next.js 15** with App Router
- **React 19** with Server Components
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **shadcn/ui** component library
- **Clerk** for authentication
- **Supabase** for database
- **AI SDK** for streaming AI responses

**Key Features:**

- AI chat interface for business automation
- Real-time tool execution tracking
- Shopify OAuth integration
- Document viewer for legal docs
- Pitch deck generator and exporter
- Analytics and reporting dashboard

See [client/README.md](./client/README.md) for detailed setup and documentation.

### Server (FastAPI Backend)

High-performance Python backend providing:

- **FastAPI** framework with async support
- **OpenAI GPT** and **Google Gemini** integration
- **Shopify Admin API** integration
- **AgentMail** for email automation
- **WeasyPrint** for PDF generation
- **AWS S3** for asset storage

**API Services:**

- Brand generation (logos, taglines, videos)
- Legal document generation (Privacy Policy, ToS, NDA)
- Shopify store management
- Customer support automation
- Email webhook processing

See [server/README.md](./server/README.md) for API documentation and setup.

### Agents (Fetch.ai uAgents)

Autonomous agents for decentralized business automation:

- **uAgents Framework** for agent orchestration
- **AgentVerse** platform integration
- **Message-based communication** with Pydantic models
- **8 specialized agents** for different business functions

**Agent Capabilities:**

- Market research and competitive analysis
- Brand identity creation
- E-commerce store setup
- Advertising campaign management
- Legal document generation
- Customer support automation
- Influencer outreach
- Investor pitch deck creation

See [agents/README.md](./agents/README.md) for deployment and architecture details.

## Usage

### Full Business Setup

Foundry can automate your entire business setup with a single command:

```
User: "Run a full setup for my sustainable clothing brand"
```

This triggers the complete workflow:

1. **Market Research** - Analyze sustainable fashion market and competitors
2. **Branding** - Generate brand name, tagline, and logo
3. **Legal Docs** - Create Privacy Policy, Terms of Service, and NDA
4. **Store Setup** - Create Shopify store with theme
5. **Email Setup** - Configure customer support email automation
6. **Phone Assistant** - Set up AI phone support
7. **Influencer Search** - Find relevant micro-influencers
8. **Brand Video** - Generate promotional video content
9. **Pitch Deck** - Create investor presentation with market data

### Individual Services

Use specific commands for individual services:

```
"Generate legal docs for TechCorp LLC in Delaware"
"Add a product to my store: Premium Yoga Mat, $49.99"
"Research competitors in the sustainable fashion space"
"Generate branding assets for my AI tutoring startup"
"Create a pitch deck for my SaaS idea"
"Set up phone assistant for customer support"
```

## Tech Stack

### Frontend

- Next.js 15, React 19, TypeScript
- Tailwind CSS 4, shadcn/ui
- Clerk (auth), Supabase (database)
- AI SDK (OpenAI, Google Gemini)
- Recharts (analytics), React Hook Form

### Backend

- FastAPI, Python 3.11+
- OpenAI GPT, Google Gemini
- Shopify Admin API, AgentMail
- WeasyPrint (PDF), boto3 (AWS)
- Supabase (database)

### Agents

- Fetch.ai uAgents Framework
- AgentVerse Platform
- Pydantic (data validation)
- FastAPI (agent endpoints)
- OpenAI, Google AI, Shopify APIs

## Development

### Running Locally

1. **Start the server** (Terminal 1):

   ```bash
   cd server
   source venv/bin/activate
   uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **Start the client** (Terminal 2):

   ```bash
   cd client
   npm run dev
   ```

3. **Start agents** (Terminal 3, optional):
   ```bash
   cd agents
   python deployment/serve.py
   ```

### API Endpoints

- **Client**: http://localhost:3000
- **Server**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Agents**: http://localhost:8001-8008 (individual agent ports)

## Deployment

### Production Deployment

**Client (Vercel):**

```bash
cd client
vercel deploy --prod
```

**Server (Railway/Render):**

```bash
cd server
# Deploy via platform CLI or GitHub integration
```

**Agents (AgentVerse):**

```bash
cd agents
python deployment/provision.py
```

### Docker Deployment

```bash
# Deploy agents with Docker
cd agents
docker-compose up --build

# Deploy individual components
docker build -t foundry-server ./server
docker build -t foundry-client ./client
```

## Security

- All API keys stored in environment variables
- Shopify webhooks validated with HMAC signatures
- Clerk authentication for user management
- Row-level security in Supabase
- CORS configured for frontend integration

## Troubleshooting

### Common Issues

**Client won't start:**

- Verify all environment variables in `.env.local`
- Check Node.js version (18+ required)
- Clear `.next` cache: `rm -rf .next`

**Server errors:**

- Activate virtual environment
- Check Python version (3.11+ required)
- Verify API keys are set in `.env`

**Agent deployment fails:**

- Check AgentVerse quota: `python deployment/capacity.py`
- Verify `AGENTVERSE_API_KEY` is valid
- Ensure agents are running locally first

**Shopify integration issues:**

- Verify OAuth redirect URLs in Shopify app settings
- Check `SHOPIFY_API_KEY` and `SHOPIFY_API_SECRET`
- Ensure required scopes are granted

## Support

- **Documentation**: Check individual component README files
- **Issues**: Create GitHub issues for bugs or feature requests
- **API Docs**: Visit http://localhost:8000/docs for server API documentation

## Links

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Fetch.ai uAgents](https://github.com/fetchai/uAgents)
- [AgentVerse Platform](https://agentverse.ai)
- [Shopify API](https://shopify.dev/docs/api)
- [Clerk Authentication](https://clerk.com/docs)
- [Supabase Documentation](https://supabase.com/docs)

---

**Built with AI for the future of business automation**
