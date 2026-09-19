import os
import json
import time
import logging
from google import genai
from google.genai import types
from pydantic import BaseModel, Field
from typing import Optional, List
from dotenv import load_dotenv

# Load environment variables (supports standalone execution/testing)
load_dotenv()

logger = logging.getLogger(__name__)

# Define Pydantic Schema for individual line items
class LineItem(BaseModel):
    description: str = Field(..., description="Description of the item or service.")
    quantity: Optional[float] = Field(None, description="Quantity purchased.")
    unit_price: Optional[float] = Field(None, description="Price per unit in JPY/USD.")
    amount: Optional[float] = Field(None, description="Total amount for this line.")

# Define Pydantic Schema for Structured JSON Output
class InvoiceExtraction(BaseModel):
    vendor_name: Optional[str] = Field(None, description="The company or person issuing the invoice.")
    invoice_number: Optional[str] = Field(None, description="The unique invoice number/ID.")
    invoice_date: Optional[str] = Field(None, description="The date the invoice was issued (YYYY-MM-DD or raw string).")
    currency: Optional[str] = Field(None, description="The currency unit used (e.g. JPY, USD, EUR, Yen, etc.)")
    subtotal: Optional[float] = Field(None, description="The invoice subtotal amount before taxes.")
    tax: Optional[float] = Field(None, description="The invoice tax amount.")
    grand_total: Optional[float] = Field(None, description="The final total amount including tax.")
    purchase_order: Optional[str] = Field(None, description="The purchase order (PO) number associated with the invoice, if present.")
    hanko_present: bool = Field(False, description="Boolean flag indicating whether a signature, corporate seal, or verification stamp is present on the invoice.")
    language: str = Field(..., description="The main language of the document (e.g., 'ja', 'en').")
    confidence_score: float = Field(..., description="A decimal score between 0.0 and 1.0 representing extraction confidence.")
    full_text: Optional[str] = Field(None, description="The complete, raw text content extracted from the entire document, preserving paragraphs and formatting.")
    line_items: List[LineItem] = Field(default=[], description="List of individual items/services listed in the invoice table.")

import requests

def sanitize_float(val):
    if val is None:
        return None
    if isinstance(val, (int, float)):
        return float(val)
    # Convert string to float by stripping currency markings and commas
    s = str(val).strip()
    for char in ['¥', '$', '£', '€', ',', ' ']:
        s = s.replace(char, '')
    try:
        return float(s)
    except ValueError:
        return None

def normalize_currency(val):
    if not val:
        return "JPY"
    s = str(val).strip().upper()
    if "YEN" in s or "円" in s or "JPY" in s or "JP" in s:
        return "JPY"
    if "USD" in s or "$" in s or "US" in s:
        return "USD"
    if "EUR" in s or "€" in s:
        return "EUR"
    if "GBP" in s or "£" in s:
        return "GBP"
    return "JPY"

class AIEngine:
    """
    Integrates Google Gemini 2.5 Flash for raw text OCR and sends the text
    to a local Ollama LLM to structure the invoice metadata according to
    the database schema, with a robust native Gemini fallback if Ollama is offline.
    """
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if self.api_key:
            self.api_key = self.api_key.strip("'\"")
            
        if not self.api_key:
            logger.warning("GEMINI_API_KEY environment variable is not set.")
            self.client = None
        else:
            self.client = genai.Client(api_key=self.api_key)
            
        self.ollama_url = os.getenv("OLLAMA_API_URL", "http://localhost:11434").rstrip('/')
        self.ollama_model = os.getenv("OLLAMA_MODEL", "llama3")

    def extract_via_ollama(self, raw_text: str) -> dict:
        """
        Sends raw text to the local Ollama API to structure it into the database schema formats.
        """
        url = f"{self.ollama_url}/api/generate"
        
        prompt = f"""
        Analyze the following raw document text and extract key invoice/receipt fields.
        You must format your response as a valid JSON object matching the following structure exactly:
        {{
            "vendor_name": "Name of the issuer company",
            "invoice_number": "Unique invoice reference number",
            "invoice_date": "Date of issue (YYYY-MM-DD or raw string)",
            "currency": "Currency used (e.g., JPY, USD)",
            "subtotal": 12000.0,
            "tax": 1200.0,
            "grand_total": 13200.0,
            "purchase_order": "PO reference number if present",
            "hanko_present": false,
            "language": "ja" or "en",
            "confidence_score": 0.95,
            "line_items": [
                {{
                    "description": "Item or service description",
                    "quantity": 1.0,
                    "unit_price": 12000.0,
                    "amount": 12000.0
                }}
            ]
        }}

        Ensure subtotal, tax, grand_total, quantity, unit_price, and amount are floats or null if not found.
        Ensure hanko_present is a boolean (true if a stamp, seal, sign, or Hanko is found or mentioned).
        Extract all items listed in the invoice table into the 'line_items' array.

        Raw text:
        {raw_text}
        """
        
        payload = {
            "model": self.ollama_model,
            "prompt": prompt,
            "format": "json",
            "stream": False,
            "options": {
                "temperature": 0.1
            }
        }
        
        logger.info(f"Sending text to local Ollama API (Model: {self.ollama_model}) for structured extraction...")
        response = requests.post(url, json=payload, timeout=25)
        response.raise_for_status()
        
        result_json = response.json()
        response_text = result_json.get("response", "").strip()
        
        parsed_json = json.loads(response_text)
        
        # Clean and sanitize float fields
        for field in ["subtotal", "tax", "grand_total"]:
            if field in parsed_json:
                parsed_json[field] = sanitize_float(parsed_json[field])
                
        # Normalize currency field
        if "currency" in parsed_json:
            parsed_json["currency"] = normalize_currency(parsed_json["currency"])
            
        # Clean line items numeric values
        if "line_items" in parsed_json and isinstance(parsed_json["line_items"], list):
            for item in parsed_json["line_items"]:
                for field in ["quantity", "unit_price", "amount"]:
                    if field in item:
                        item[field] = sanitize_float(item[field])
                        
        return parsed_json

    def analyze_invoice(self, file_path: str, mime_type: str = None, max_retries: int = 3, backoff_factor: int = 2) -> dict:
        """
        Ingestion pipeline:
        1. Calls Gemini 2.5 Flash to extract raw text content (OCR).
        2. Routes raw text to local Ollama LLM to format it into structured JSON.
        3. If Ollama fails/offline, falls back to Gemini native structured JSON extraction.
        """
        if not self.client:
            raise ValueError("Gemini API Client is not initialized. Check GEMINI_API_KEY.")

        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Invoice file not found at {file_path}")

        # Guess MIME type if empty or generic
        if not mime_type or mime_type in ('application/octet-stream', ''):
            import mimetypes
            guessed_type, _ = mimetypes.guess_type(file_path)
            if guessed_type:
                mime_type = guessed_type
            else:
                ext = os.path.splitext(file_path)[1].lower()
                if ext == '.pdf':
                    mime_type = 'application/pdf'
                elif ext in ['.jpg', '.jpeg']:
                    mime_type = 'image/jpeg'
                elif ext == '.png':
                    mime_type = 'image/png'

        # Read binary data
        with open(file_path, "rb") as f:
            file_bytes = f.read()

        # Step 1: Perform raw OCR text extraction using Gemini 2.5 Flash
        logger.info("Step 1: Extracting raw text content via Gemini 2.5 Flash...")
        raw_text_prompt = "Extract the complete raw text of this document. Keep columns, lines, and formatting intact. Do not add explanations or markdown blocks."
        
        try:
            raw_response = self.client.models.generate_content(
                model='gemini-2.5-flash',
                contents=[
                    types.Part.from_bytes(data=file_bytes, mime_type=mime_type),
                    raw_text_prompt
                ],
                config=types.GenerateContentConfig(temperature=0.1)
            )
            full_text_content = raw_response.text or ""
            logger.info("Raw text extracted successfully.")
        except Exception as e:
            logger.error(f"Failed raw text extraction via Gemini: {e}")
            raise e

        # Step 2: Structure text via local Ollama LLM
        try:
            structured_data = self.extract_via_ollama(full_text_content)
            
            # Perform Pydantic Validation on parsed JSON dict
            structured_data["full_text"] = full_text_content
            validated_data = InvoiceExtraction(**structured_data)
            logger.info("Structured JSON successfully formatted via Ollama and validated.")
            return validated_data.model_dump()
            
        except Exception as ollama_err:
            logger.warning(f"Ollama structured generation failed or offline: {ollama_err}. Falling back to Gemini native JSON structure...")
            
            # Step 3: Fallback - Request Gemini to return structured JSON directly
            gemini_structured_prompt = (
                "Analyze this document (invoice, receipt, report, or paper scan) and extract key structured fields. "
                "Examine the document carefully to check if a physical signature, corporate seal, or verification stamp "
                "is printed, stamped, or signed onto the document. Set 'hanko_present' to true if you see one."
            )
            
            config = types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=InvoiceExtraction,
                temperature=0.1,
            )
            
            contents = [
                types.Part.from_bytes(data=file_bytes, mime_type=mime_type),
                gemini_structured_prompt
            ]
            
            attempt = 0
            while attempt < max_retries:
                try:
                    logger.info(f"Gemini fallback structured extraction. Attempt {attempt + 1}/{max_retries}")
                    response = self.client.models.generate_content(
                        model='gemini-2.5-flash',
                        contents=contents,
                        config=config
                    )
                    response_text = response.text or ""
                    
                    # Clean markdown wrappers if any
                    response_text = response_text.strip()
                    if response_text.startswith("```"):
                        lines = response_text.splitlines()
                        if lines[0].startswith("```json"):
                            response_text = "\n".join(lines[1:-1])
                        else:
                            response_text = "\n".join(lines[1:-1])
                    response_text = response_text.strip()
                    
                    parsed_json = json.loads(response_text)
                    
                    # Clean and sanitize float fields
                    for field in ["subtotal", "tax", "grand_total"]:
                        if field in parsed_json:
                            parsed_json[field] = sanitize_float(parsed_json[field])
                            
                    # Normalize currency field
                    if "currency" in parsed_json:
                        parsed_json["currency"] = normalize_currency(parsed_json["currency"])
                        
                    # Clean line items numeric values
                    if "line_items" in parsed_json and isinstance(parsed_json["line_items"], list):
                        for item in parsed_json["line_items"]:
                            for field in ["quantity", "unit_price", "amount"]:
                                if field in item:
                                    item[field] = sanitize_float(item[field])
                                    
                    parsed_json["full_text"] = full_text_content
                    validated_data = InvoiceExtraction(**parsed_json)
                    logger.info("Structured JSON fallback successfully extracted via Gemini and validated.")
                    return validated_data.model_dump()
                    
                except Exception as gemini_err:
                    attempt += 1
                    logger.warning(f"Fallback attempt {attempt} failed: {gemini_err}")
                    if attempt >= max_retries:
                        logger.error("Max retries exceeded for Gemini fallback structured analysis.")
                        raise gemini_err
                    
                    sleep_time = backoff_factor ** attempt
                    time.sleep(sleep_time)

        raise RuntimeError("Failed to extract data after maximum retries.")
