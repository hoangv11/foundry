# Investor Agent

AI-powered pitch deck generator that creates investor-ready presentations, financial models, and fundraising materials for startups.

## What It Does

The Investor Agent automates fundraising preparation:
- **Pitch Deck Creation** - Professional slide decks with compelling narratives
- **Financial Modeling** - Revenue projections and unit economics
- **Market Analysis** - TAM/SAM/SOM calculations and competitive landscape
- **Investment Thesis** - Clear value proposition and growth strategy
- **Investor Targeting** - Identify relevant VCs and angel investors
- **Due Diligence Materials** - Data room preparation and documentation

## How It Works

```
Business Idea → AI Analysis → Financial Model → Pitch Deck → Investor Materials
```

Combines market data, financial modeling, and storytelling AI to create compelling pitch decks that resonate with investors.

## Use Cases

**For Pre-Seed Startups**
- Create first pitch deck from scratch
- Model financial projections professionally
- Prepare for angel investor meetings

**For Series A Fundraising**
- Refine pitch narrative with traction data
- Update financial models with actuals
- Generate investor-specific presentations

**For Accelerator Applications**
- Build application-ready pitch decks
- Demonstrate market opportunity clearly
- Show viable path to profitability

## API Usage

### Request Format
```json
POST /submit

{
  "business_name": "AI SaaS Co",
  "industry": "enterprise software",
  "funding_stage": "seed",
  "funding_amount": "1000000",
  "team_size": 3,
  "current_revenue": "10000",
  "growth_rate": "20",
  "key_metrics": {
    "users": 500,
    "mrr": "$10k",
    "churn": "5%"
  }
}
```

### Response Format
```json
{
  "success": true,
  "pitch_deck": {
    "pdf_url": "https://...",
    "slides": 12,
    "sections": [
      "Problem",
      "Solution",
      "Market Size",
      "Business Model",
      "Traction",
      "Team",
      "Financials",
      "Ask"
    ]
  },
  "financial_model": {
    "xlsx_url": "https://...",
    "projections": {
      "year1_revenue": "$250k",
      "year3_revenue": "$5M",
      "burn_rate": "$50k/month"
    }
  },
  "investor_notes": {
    "target_investors": [...],
    "key_talking_points": [...],
    "qa_preparation": [...]
  }
}
```

## Configuration

### Environment Variables
```bash
AGENTVERSE_API_KEY=your_key
OPENAI_API_KEY=your_key
GOOGLE_API_KEY=your_key
PITCHBOOK_API_KEY=your_key      # Optional, for market data
```

### Running the Agent

**Local Development**
```bash
cd agents/investor
python agent.py
# Agent runs on port 8008
```

**Via Deployment Tools**
```bash
# Start all agents
python deployment/serve.py

# Deploy to AgentVerse
python deployment/provision.py
```

## Key Features

✓ **Investor-Ready Design** - Professional, modern slide templates
✓ **Data-Driven Narrative** - Compelling storytelling with metrics
✓ **Financial Rigor** - Realistic projections and unit economics
✓ **Market Intelligence** - Competitive analysis and positioning
✓ **Custom Tailoring** - Industry-specific pitch variations
✓ **Fast Turnaround** - Complete deck in under 10 minutes

## Technical Details

- **Port**: 8008
- **Models**: OpenAI GPT-4, Google Gemini
- **Response Time**: 5-10 minutes (full deck generation)
- **Output**: PDF deck, Excel financial model, presentation notes

## Support

- **Docs**: [AgentVerse Documentation](https://docs.agentverse.ai)
- **Issues**: Report via GitHub Issues
- **Community**: [Fetch.ai Discord](https://discord.gg/fetchai)

**Note**: AI-generated pitch decks should be reviewed and customized before presenting to investors.

