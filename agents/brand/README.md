# Brand Agent

AI-powered branding agent that creates complete brand identities including names, taglines, logos, color schemes, and brand guidelines.

## What It Does

The Brand Agent generates comprehensive brand assets:

- **Brand Names** - Creative, memorable business names
- **Taglines** - Compelling slogans and brand messages
- **Color Schemes** - Professional color palettes with psychology
- **Logo Concepts** - Detailed visual identity descriptions
- **Brand Guidelines** - Complete usage rules and style guides
- **Visual Assets** - Business cards, social templates, and more

## How It Works

```
Business Idea → AI Creative Process → Brand Identity Package
```

Uses Google Gemini's creative AI to generate cohesive brand identities that resonate with your target audience.

## Use Cases

**For Startups**

- Create complete brand identity from scratch
- Develop memorable brand presence
- Stand out in competitive markets

**For Rebrands**

- Refresh existing brand identity
- Modernize visual presence
- Reconnect with target audience

**For Agencies**

- Generate brand concepts quickly
- Provide clients with options
- Accelerate creative process

## API Usage

### Request Format

```json
POST /submit

{
  "business_idea": "AI-powered fitness app",
  "industry": "healthcare",
  "target_audience": "fitness enthusiasts",
  "brand_personality": ["modern", "energetic", "professional"],
  "style_preferences": ["minimalist", "tech-focused"]
}
```

### Response Format

```json
{
  "success": true,
  "brand_name": "FitAI Pro",
  "tagline": "Transform Your Fitness with AI",
  "color_scheme": {
    "primary": "#2563eb",
    "secondary": "#10b981",
    "accent": "#f59e0b"
  },
  "logo_description": "Modern logo with AI circuit pattern and fitness icon",
  "brand_guidelines": {
    "typography": {...},
    "voice_tone": {...}
  }
}
```

## Configuration

### Environment Variables

```bash
AGENTVERSE_API_KEY=your_key
GOOGLE_API_KEY=your_key
GEMINI_MODEL=gemini-pro           # Optional, defaults to gemini-pro
```

### Running the Agent

**Local Development**

```bash
cd agents/brand
python agent.py
# Agent runs on port 8002
```

**Via Deployment Tools**

```bash
# Start all agents
python deployment/serve.py

# Deploy to AgentVerse
python deployment/provision.py
```

## Key Features

✓ **Complete Brand Identity** - Everything from name to guidelines
✓ **AI-Powered Creativity** - Google Gemini creative generation
✓ **Industry-Specific** - Tailored to your market sector
✓ **Professional Quality** - Enterprise-grade brand assets
✓ **Fast Delivery** - Complete brand in under 60 seconds
✓ **Customizable** - Fits your brand personality and audience

## Technical Details

- **Port**: 8002
- **Model**: Google Gemini Pro
- **Response Time**: 30-60 seconds
- **Output**: Structured JSON with all brand assets

## Support

- **Docs**: [AgentVerse Documentation](https://docs.agentverse.ai)
- **Issues**: Report via GitHub Issues
- **Community**: [Fetch.ai Discord](https://discord.gg/fetchai)

---
