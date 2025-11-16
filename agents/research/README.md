# Research Agent

AI-powered market research agent that discovers trending niches, analyzes market demand, and provides actionable business intelligence.

## What It Does

The Research Agent helps you validate business ideas by analyzing:
- **Market Trends** - Identifies emerging opportunities and hot niches
- **Demand Analysis** - Evaluates product/service demand across markets
- **Competitor Intelligence** - Analyzes competitor strategies and positioning
- **Market Sizing** - Calculates TAM, SAM, and SOM estimates
- **Strategic Insights** - Provides data-driven recommendations

## How It Works

```
Your Request → AI Analysis → Market Data → Actionable Insights
```

The agent combines multiple data sources and AI models to deliver comprehensive market research without manual effort.

## Use Cases

**For Entrepreneurs**
- Validate startup ideas before building
- Find profitable niches in your industry
- Understand target market size and potential

**For Product Managers**
- Research new product opportunities
- Analyze competitive landscape
- Identify market gaps and positioning

**For Investors**
- Evaluate investment opportunities
- Assess market potential and growth
- Perform due diligence research

## API Usage

### Request Format
```json
POST /submit

{
  "industry": "technology",
  "region": "global",
  "focus_areas": ["trends", "competitors", "demand"],
  "budget_range": "0-50k"
}
```

### Response Format
```json
{
  "success": true,
  "market_insights": {
    "trending_niches": [...],
    "market_size": {
      "tam": "$50B",
      "sam": "$5B",
      "som": "$500M"
    },
    "competitors": [...],
    "recommendations": [...]
  }
}
```

## Configuration

### Environment Variables
```bash
AGENTVERSE_API_KEY=your_key
OPENAI_API_KEY=your_key       # Optional, for enhanced analysis
GOOGLE_API_KEY=your_key        # Optional, for data enrichment
```

### Running the Agent

**Local Development**
```bash
cd agents/research
python agent.py
# Agent runs on port 8001
```

**Via Deployment Tools**
```bash
# Start all agents
python deployment/serve.py

# Deploy to AgentVerse
python deployment/provision.py
```

## Key Features

✓ **Comprehensive Analysis** - Multi-source data aggregation
✓ **Real-Time Insights** - Current market data and trends
✓ **Competitive Intelligence** - Detailed competitor analysis
✓ **Market Sizing** - TAM/SAM/SOM calculations
✓ **Strategic Recommendations** - Actionable business insights
✓ **Industry Specific** - Tailored to your sector

## Technical Details

- **Port**: 8001
- **Model**: OpenAI GPT-4 + Google Gemini
- **Response Time**: 10-30 seconds
- **Data Sources**: Multiple APIs and databases

## Support

- **Docs**: [AgentVerse Documentation](https://docs.agentverse.ai)
- **Issues**: Report via GitHub Issues
- **Community**: [Fetch.ai Discord](https://discord.gg/fetchai)


