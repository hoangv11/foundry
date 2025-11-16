# Support Agent

AI-powered customer service automation that handles email support, creates response templates, and provides 24/7 customer assistance.

## What It Does

The Support Agent automates customer service operations:
- **Email Automation** - AI-powered email response generation
- **Template Creation** - Pre-built response templates for common issues
- **Multi-Channel Support** - Email, chat, and phone integration
- **Ticket Management** - Automated ticket routing and prioritization
- **Knowledge Base** - Self-service documentation generation
- **Sentiment Analysis** - Customer satisfaction tracking

## How It Works

```
Customer Inquiry ’ AI Analysis ’ Automated Response ’ Human Review (Optional)
```

Processes customer support requests using AI to generate professional, contextual responses that match your brand voice.

## Use Cases

**For E-Commerce Stores**
- Handle order inquiries automatically
- Manage returns and refunds efficiently
- Provide instant product support

**For SaaS Companies**
- Answer technical questions 24/7
- Guide users through onboarding
- Reduce support ticket volume

**For Service Businesses**
- Schedule appointments automatically
- Answer frequently asked questions
- Provide service information instantly

## API Usage

### Request Format
```json
POST /submit

{
  "business_name": "TechStore",
  "business_type": "e-commerce",
  "support_channels": ["email", "chat"],
  "business_hours": "9am-5pm EST",
  "phone_number": "+1234567890",
  "email_address": "support@techstore.com"
}
```

### Response Format
```json
{
  "success": true,
  "email_templates": [
    {
      "type": "order_inquiry",
      "subject": "Re: Your Order Status",
      "template": "Dear customer, ..."
    }
  ],
  "chat_automation": {
    "greeting": "Hi! How can I help you today?",
    "common_responses": [...]
  },
  "phone_setup": {
    "vapi_config": {...},
    "greeting_script": "..."
  }
}
```

## Configuration

### Environment Variables
```bash
AGENTVERSE_API_KEY=your_key
OPENAI_API_KEY=your_key
GOOGLE_API_KEY=your_key
AGENT_MAIL_API_KEY=your_key     # For email automation
VAPI_API_KEY=your_key            # For phone support
```

### Running the Agent

**Local Development**
```bash
cd agents/support
python agent.py
# Agent runs on port 8006
```

**Via Deployment Tools**
```bash
# Start all agents
python deployment/serve.py

# Deploy to AgentVerse
python deployment/provision.py
```

## Key Features

 **24/7 Availability** - Never miss a customer inquiry
 **Multi-Language Support** - Respond in customer's language
 **Brand Voice Matching** - Responses match your tone
 **Smart Routing** - Complex issues escalated to humans
 **Analytics Dashboard** - Track response times and satisfaction
 **Integration Ready** - Works with existing support tools

## Technical Details

- **Port**: 8006
- **Models**: OpenAI GPT-4, Google Gemini
- **Response Time**: 5-15 seconds
- **Integration**: AgentMail, VAPI, Zendesk, Intercom

## Support

- **Docs**: [AgentVerse Documentation](https://docs.agentverse.ai)
- **Issues**: Report via GitHub Issues
- **Community**: [Fetch.ai Discord](https://discord.gg/fetchai)

