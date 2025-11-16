import os
from dotenv import load_dotenv
from agentmail import AgentMail
import os

# Get the variable, returning None if not found
load_dotenv()

def email_setup():
    api_key = os.getenv("AGENT_MAIL_API_KEY")
    ngrok_url = os.getenv("NGROK_URL")

    if not api_key:
        print("AGENT_MAIL_API_KEY not set. Skipping email webhook setup.")
        return

    if not ngrok_url:
        print("NGROK_URL not set. Skipping email webhook setup.")
        return

    print("Setting up email webhook...")
    client = AgentMail(api_key=api_key)

    all_webhooks = client.webhooks.list()
    if any(webhook.url == f"{ngrok_url}/email/webhook" for webhook in all_webhooks.webhooks):
        print("Email webhook already exists.")
        return

    client.webhooks.create(
        url=f"{ngrok_url}/email/webhook",
        event_types=['message.received'],
    )
    print("Email webhook setup complete.")