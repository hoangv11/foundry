# Advertising Agent

AI-powered advertising agent that creates and launches multi-platform ad campaigns across Google Ads and Meta (Facebook/Instagram).

## What It Does

The Advertising Agent automates campaign management:
- **Campaign Creation** - Google Ads and Meta Ads setup
- **Ad Creative Generation** - Compelling copy and visual concepts
- **Audience Targeting** - Precise demographic and interest targeting
- **Budget Allocation** - Smart spend distribution across platforms
- **Performance Optimization** - Campaign monitoring and recommendations
- **Analytics Tracking** - Real-time metrics and reporting

## How It Works

\`\`\`
Campaign Brief → AI Strategy → Multi-Platform Ad Campaigns
\`\`\`

Creates data-driven advertising campaigns optimized for your business goals, target audience, and budget constraints.

## Use Cases

**For E-Commerce Businesses**
- Drive product sales and conversions
- Increase website traffic
- Retarget potential customers

**For Service Providers**
- Generate qualified leads
- Build brand awareness
- Promote special offers

**For App Developers**
- Acquire new users cost-effectively
- Promote app features
- Increase installs and engagement

## API Usage

### Request Format
\`\`\`json
POST /submit

{
  "business_name": "TechGear Pro",
  "industry": "electronics",
  "campaign_goal": "sales",
  "target_audience": {
    "age_range": "25-45",
    "interests": ["technology", "gadgets"],
    "location": ["US", "CA"]
  },
  "budget": {
    "total": 5000,
    "daily": 100
  },
  "platforms": ["google", "meta"]
}
\`\`\`

### Response Format
\`\`\`json
{
  "success": true,
  "campaigns": [
    {
      "platform": "google",
      "campaign_id": "camp_123",
      "status": "active",
      "daily_budget": "$50"
    },
    {
      "platform": "meta",
      "campaign_id": "camp_456",
      "status": "active",
      "daily_budget": "$50"
    }
  ],
  "ad_creatives": [...],
  "targeting": {...},
  "estimated_reach": "50K-100K people"
}
\`\`\`

## Configuration

### Environment Variables
\`\`\`bash
AGENTVERSE_API_KEY=your_key
GOOGLE_ADS_API_KEY=your_key
META_ACCESS_TOKEN=your_token
OPENAI_API_KEY=your_key
\`\`\`

### Running the Agent

**Local Development**
\`\`\`bash
cd agents/advertising
python agent.py
# Agent runs on port 8004
\`\`\`

**Via Deployment Tools**
\`\`\`bash
python deployment/serve.py
python deployment/provision.py
\`\`\`

## Key Features

✓ **Multi-Platform** - Google Ads + Meta Ads integration
✓ **AI-Generated Creatives** - Compelling ad copy and concepts
✓ **Smart Targeting** - Data-driven audience selection
✓ **Budget Optimization** - Efficient spend allocation
✓ **Performance Tracking** - Real-time campaign metrics
✓ **A/B Testing** - Automatic variant testing

## Technical Details

- **Port**: 8004
- **Platforms**: Google Ads API, Meta Marketing API
- **Response Time**: 3-10 minutes
- **Models**: OpenAI GPT-4 for ad creative

## Support

- **Docs**: [AgentVerse Documentation](https://docs.agentverse.ai)
- **Issues**: Report via GitHub Issues
- **Community**: [Fetch.ai Discord](https://discord.gg/fetchai)
