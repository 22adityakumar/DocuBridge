import logging
from google import genai
from google.genai import types
from flask import current_app

logger = logging.getLogger(__name__)

class GeminiClient:
    """
    Boilerplate wrapper for Google Gemini API client.
    """
    def __init__(self):
        self.api_key = current_app.config.get("GEMINI_API_KEY")
        # Initialize Google GenAI Client
        # Under normal conditions, client initialization relies on environment variables or explicit api_key
        if self.api_key:
            self.client = genai.Client(api_key=self.api_key)
        else:
            self.client = None
            logger.warning("Gemini API Key is not set in configuration.")

    def analyze_document_content(self, prompt: str, file_bytes: bytes, mime_type: str) -> str:
        """
        Boilerplate method for analyzing document content (such as PDFs/images containing Hanko seals)
        using Gemini 2.5 Flash.
        """
        if not self.client:
            logger.error("Gemini client not initialized.")
            return "Gemini API Client not configured."

        try:
            logger.info("Sending document analysis request to Gemini 2.5 Flash.")
            
            # Using the new Google GenAI SDK syntax
            response = self.client.models.generate_content(
                model='gemini-2.5-flash',
                contents=[
                    types.Part.from_bytes(
                        data=file_bytes,
                        mime_type=mime_type
                    ),
                    prompt
                ]
            )
            return response.text
        except Exception as e:
            logger.error(f"Gemini API processing failed: {e}")
            raise e
