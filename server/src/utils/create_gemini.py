import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
IMAGE_MODEL = os.getenv("GEMINI_IMAGE_MODEL", "gemini-2.5-flash")
VIDEO_MODEL = os.getenv("GEMINI_VIDEO_MODEL", "veo-3.0-generate-001")

if API_KEY:
    genai.configure(api_key=API_KEY)
    client = genai.GenerativeModel(MODEL)
else:
    client = None

def create_gemini_client():
    if not client:
        raise RuntimeError("GEMINI_API_KEY or GOOGLE_API_KEY not set")
    return MODEL, client

def create_gemini_image_client():
    if not client:
        raise RuntimeError("GEMINI_API_KEY or GOOGLE_API_KEY not set")
    return IMAGE_MODEL, genai.GenerativeModel(IMAGE_MODEL)

def create_gemini_video_client():
    if not client:
        raise RuntimeError("GEMINI_API_KEY or GOOGLE_API_KEY not set")
    return VIDEO_MODEL, genai.GenerativeModel(VIDEO_MODEL)