# Foundry Agents

A comprehensive collection of 8 AI agents designed for autonomous business automation, built with the Fetch.ai uAgents framework and deployable to AgentVerse platform.

## 🤖 Agents Overview

| Agent | Port | Description |
|-------|------|-------------|
| **Market Research** | 8001 | Finds trending niches and analyzes product demand |
| **Branding** | 8002 | Creates logos, taglines, color schemes, and visual assets |
| **Shopify Store** | 8003 | Creates and publishes Shopify storefronts |
| **Ads** | 8004 | Launches Google and Meta advertising campaigns |
| **Legal Docs** | 8005 | Auto-generates LLC docs, policies, and Terms of Service |
| **Customer Service** | 8006 | Drafts email templates and automates customer responses |
| **Influencer** | 8007 | Finds micro-influencers and drafts outreach campaigns |
| **Pitch Deck** | 8008 | Builds investor-ready pitch decks and financial models |

## 🚀 Quick Start

### Prerequisites

1. **Python 3.11+**
2. **AgentVerse API Key** - Get from [AgentVerse](https://agentverse.ai)
3. **Docker** (optional, for containerized deployment)

### Installation

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd agents
   pip install -r requirements.txt
   ```

2. **Set environment variables:**
   ```bash
   cp env.example .env
   # Edit .env and add required API keys
   ```

   Required environment variables:
   ```ini
   # Fetch.ai Configuration
   AGENTVERSE_API_KEY=your_agentverse_api_key

   # AI Service API Keys
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_API_KEY=your_google_api_key

   # Shopify Integration (for ecommerce agent)
   SHOPIFY_API_KEY=your_shopify_api_key
   SHOPIFY_API_SECRET=your_shopify_secret

   # Optional: Logging and Debug
   AGENT_DEBUG=false
   AGENT_LOG_LEVEL=INFO
   ```

### Running Agents

#### Option 1: Local Development
```bash
# Start all agents locally
python deployment/serve.py

# Deploy to AgentVerse
python deployment/provision.py
```

#### Option 2: Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build

# Deploy to AgentVerse (run in another terminal)
python deployment/provision.py
```

## 📋 Agent Details

### 1. Market Research Agent
- **Purpose**: Market analysis and trend identification
- **Input**: Industry, region, focus areas, budget range
- **Output**: Market insights, competitor analysis, trending products
- **Use Cases**: Business validation, market entry, competitive analysis

### 2. Branding Agent
- **Purpose**: Complete brand identity creation
- **Input**: Business idea, industry, target audience, brand personality
- **Output**: Brand name, tagline, color scheme, logo concepts, brand guidelines
- **Use Cases**: Startup branding, rebranding, brand identity

### 3. Shopify Store Agent
- **Purpose**: E-commerce store creation and management
- **Input**: Store name, industry, products, theme preferences
- **Output**: Live store URL, admin access, store configuration
- **Use Cases**: E-commerce launch, dropshipping, online selling

### 4. Ads Agent
- **Purpose**: Multi-platform advertising campaign management
- **Input**: Business details, target audience, budget, platforms
- **Output**: Campaign IDs, ad creatives, targeting setup, performance metrics
- **Use Cases**: Digital marketing, customer acquisition, brand awareness

### 5. Legal Docs Agent
- **Purpose**: Legal document generation and compliance
- **Input**: Business details, document types, state, owner info
- **Output**: Legal documents, filing requirements, compliance checklist
- **Use Cases**: Business formation, legal compliance, document automation

### 6. Customer Service Agent
- **Purpose**: Customer service automation and support
- **Input**: Business details, service types, phone number, business hours
- **Output**: Email templates, phone automation, chat responses, VAPI setup
- **Use Cases**: Customer support, service automation, response management

### 7. Influencer Agent
- **Purpose**: Influencer marketing and outreach
- **Input**: Business details, target audience, budget, campaign goals
- **Output**: Influencer recommendations, outreach templates, campaign strategy
- **Use Cases**: Influencer marketing, brand partnerships, social media campaigns

### 8. Pitch Deck Agent
- **Purpose**: Investor presentation and financial modeling
- **Input**: Business idea, funding amount, team info, financial projections
- **Output**: Pitch deck PDF, financial model, investor notes, presentation script
- **Use Cases**: Fundraising, investor presentations, startup pitches

## 📁 Project Structure

```
agents/
├── deployment/
│   ├── capacity.py          # Check AgentVerse quota
│   ├── orchestrate.py       # Manage agent deployments
│   ├── provision.py         # Deploy all agents
│   ├── serve.py             # Run agents locally
│   └── validate.py          # Test agent endpoints
├── advertising/
│   ├── agent.py             # Ads campaign agent
│   └── README.md
├── brand/
│   ├── agent.py             # Branding agent
│   └── README.md
├── ecommerce/
│   ├── agent.py             # Shopify store agent
│   └── README.md
├── investor/
│   ├── agent.py             # Pitch deck agent
│   └── README.md
├── legal/
│   ├── agent.py             # Legal docs agent
│   └── README.md
├── outreach/
│   ├── agent.py             # Influencer outreach agent
│   └── README.md
├── research/
│   ├── agent.py             # Market research agent
│   └── README.md
├── support/
│   ├── agent.py             # Customer support agent
│   └── README.md
├── Dockerfile
├── docker-compose.yml
├── env.example
├── requirements.txt
└── README.md
```

## 🔧 Configuration

### Agent Customization

Each agent can be customized by modifying the respective `agent.py` file in its directory. Key customization points:

- **Agent configuration**: Modify name, seed, port, and endpoint
- **Message models**: Customize request/response Pydantic models
- **Business logic**: Implement core agent functionality
- **API integrations**: Add external service connections (OpenAI, Google, Shopify, etc.)
- **Response formats**: Customize output structures
- **Validation**: Add input validation rules
- **Error handling**: Implement custom error responses

## 📊 Monitoring and Analytics

### Health Checks
- Each agent exposes a `/health` endpoint
- Docker health checks monitor agent status
- Logs are available in the `logs/` directory

### Performance Metrics
- Response times
- Success rates
- Error tracking
- Usage statistics

## 🚀 Deployment to AgentVerse

### **Important: Quota Management**
AgentVerse has a quota limit of **4 agents** on the free tier. Use the management scripts to deploy strategically.

### **Step-by-Step Deployment:**

1. **Check your current quota:**
   ```bash
   python deployment/capacity.py
   ```

2. **Start agents locally:**
   ```bash
   python deployment/serve.py
   ```

3. **Deploy priority agents (recommended):**
   ```bash
   python deployment/orchestrate.py
   # Choose option 2: Deploy priority agents (4 agents)
   ```

4. **Or deploy all agents (may hit quota):**
   ```bash
   python deployment/provision.py
   ```

5. **Verify deployment:**
   - Visit [AgentVerse](https://agentverse.ai)
   - Search for your agents
   - Test agent functionality

### **Priority Agents (Deploy First):**
1. **Market Research Agent** - Essential for business validation
2. **Branding Agent** - Critical for brand identity
3. **Shopify Store Agent** - Key for e-commerce
4. **Ads Agent** - Important for marketing

### **Secondary Agents (Deploy After):**
5. **Legal Docs Agent** - Important for compliance
6. **Customer Service Agent** - Useful for support
7. **Influencer Agent** - Good for marketing
8. **Pitch Deck Agent** - Helpful for fundraising

## 🔍 Testing Agents

### Individual Agent Testing
```bash
# Test a specific agent
curl -X POST http://localhost:8001/submit \
  -H "Content-Type: application/json" \
  -d '{"industry": "technology", "region": "global"}'
```

### Batch Testing
```bash
# Test all agents
python deployment/validate.py
```

## 📚 Agent Architecture

### uAgents Framework

Each agent is built using the Fetch.ai uAgents framework, which provides:

- **Autonomous operation**: Agents run independently and handle requests asynchronously
- **Message-based communication**: Pydantic models define request/response schemas
- **AgentVerse integration**: Deploy to Fetch.ai's decentralized agent network
- **Event-driven**: Agents respond to messages using decorators (`@AGENT.on_message`)

### Agent Lifecycle

1. **Initialization**: Agent configured with name, seed phrase, port, and endpoint
2. **Registration**: (Optional) Agent registered to AgentVerse for discovery
3. **Message handling**: Agent listens for requests matching defined models
4. **Processing**: Business logic executes using AI services and external APIs
5. **Response**: Results returned to sender via message protocol

### Example Agent Structure

```python
from uagents import Agent, Context
from pydantic import BaseModel

AGENT = Agent(
    name="example_agent",
    seed="unique-seed-phrase",
    port=8001,
    endpoint=["http://localhost:8001/submit"]
)

class Request(BaseModel):
    input_field: str

class Response(BaseModel):
    success: bool
    result: str

@AGENT.on_message(model=Request)
async def handle_request(ctx: Context, sender: str, msg: Request):
    ctx.logger.info(f"Received: {msg.input_field}")
    # Process request
    await ctx.send(sender, Response(success=True, result="Done"))

if __name__ == "__main__":
    AGENT.run()
```

## 📚 API Documentation

Each agent exposes endpoints compatible with the uAgents protocol:

- `POST /submit` - Main message endpoint for agent communication
- Agent communication uses the uAgents message protocol with Pydantic models

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔧 Deployment Utilities

### `deployment/capacity.py`
Check your current AgentVerse quota and agent limits
```bash
python deployment/capacity.py
```

### `deployment/serve.py`
Start all agents locally for development and testing
```bash
python deployment/serve.py
```

### `deployment/provision.py`
Deploy all agents to AgentVerse platform
```bash
python deployment/provision.py
```

### `deployment/orchestrate.py`
Interactive deployment manager with options for:
- Deploy priority agents (first 4)
- Deploy all agents
- Check deployment status
```bash
python deployment/orchestrate.py
```

### `deployment/validate.py`
Test all agent endpoints and verify functionality
```bash
python deployment/validate.py
```

## 🆘 Support

- **Documentation**: Check individual agent README files in each agent directory
- **Issues**: Create GitHub issues for bugs or feature requests
- **Community**: Join the Fetch.ai community for support
- **Logs**: Check `uagents_core.log` for agent execution logs

## 🔗 Links

- [Fetch.ai Documentation](https://docs.fetch.ai)
- [AgentVerse Platform](https://agentverse.ai)
- [uAgents Framework](https://github.com/fetchai/uAgents)
- [uAgents Python Package](https://pypi.org/project/uagents/)

## 🛠️ Troubleshooting

### Common Issues

**Agent won't start:**
- Check that the port is not already in use
- Verify all required API keys are set in `.env`
- Check `uagents_core.log` for error messages

**AgentVerse quota exceeded:**
- Use `deployment/capacity.py` to check quota
- Deploy priority agents first using `deployment/orchestrate.py`
- Free tier limited to 4 agents

**Agent deployment fails:**
- Verify `AGENTVERSE_API_KEY` is valid
- Check network connectivity
- Ensure agent endpoints are publicly accessible

**Docker container issues:**
- Verify all environment variables are set
- Check container logs: `docker-compose logs`
- Restart containers: `docker-compose restart`

---

**Built for the Fetch.ai ecosystem**
