# Legal Agent

AI-powered legal document generator that creates LLC formation documents, privacy policies, terms of service, and compliance materials.

## What It Does

The Legal Agent automates legal document creation:
- **LLC Formation** - Complete formation documents and filing guides
- **Privacy Policies** - GDPR and CCPA compliant policies
- **Terms of Service** - Comprehensive TOS agreements
- **NDA Templates** - Non-disclosure agreement templates
- **Employment Contracts** - Employment agreement templates
- **Compliance Checklists** - Step-by-step regulatory guides

## How It Works

\`\`\`
Business Details → AI Legal Analysis → Professional Documents
\`\`\`

Generates legally-sound documents tailored to your business type, industry, and jurisdiction using AI legal knowledge.

## Use Cases

**For New Businesses**
- Form LLC without expensive lawyers
- Get compliant documents quickly
- Understand filing requirements

**For Websites & Apps**
- Create required legal pages
- Ensure privacy compliance
- Protect your business legally

**For Startups**
- Prepare for launch quickly
- Professional legal documentation
- Compliance from day one

## API Usage

### Request Format
\`\`\`json
POST /submit

{
  "business_name": "TechCorp LLC",
  "business_type": "technology",
  "state": "Delaware",
  "document_types": ["llc", "privacy_policy", "tos"],
  "owner_info": {
    "name": "John Doe",
    "address": "123 Main St"
  }
}
\`\`\`

### Response Format
\`\`\`json
{
  "success": true,
  "documents": [
    {
      "type": "llc_formation",
      "title": "LLC Formation Documents",
      "pdf_url": "https://...",
      "filing_state": "Delaware"
    },
    {
      "type": "privacy_policy",
      "title": "Privacy Policy",
      "content": "..."
    }
  ],
  "filing_requirements": [...],
  "estimated_costs": "$300-500"
}
\`\`\`

## Configuration

### Environment Variables
\`\`\`bash
AGENTVERSE_API_KEY=your_key
OPENAI_API_KEY=your_key
GOOGLE_API_KEY=your_key
\`\`\`

### Running the Agent

**Local Development**
\`\`\`bash
cd agents/legal
python agent.py
# Agent runs on port 8005
\`\`\`

**Via Deployment Tools**
\`\`\`bash
python deployment/serve.py
python deployment/provision.py
\`\`\`

## Key Features

✓ **Legally Sound** - AI-generated, legally compliant documents
✓ **Multi-Jurisdiction** - State and country-specific documents
✓ **GDPR/CCPA Compliant** - Privacy law compliance
✓ **Cost-Effective** - Fraction of lawyer costs
✓ **Fast Delivery** - Documents in minutes, not days
✓ **Customizable** - Tailored to your business

## Technical Details

- **Port**: 8005
- **Models**: OpenAI GPT-4, Google Gemini
- **Response Time**: 2-5 minutes
- **Output**: PDF + editable formats

## Support

- **Docs**: [AgentVerse Documentation](https://docs.agentverse.ai)
- **Issues**: Report via GitHub Issues
- **Community**: [Fetch.ai Discord](https://discord.gg/fetchai)

**Note**: AI-generated legal documents should be reviewed by a licensed attorney before use.
