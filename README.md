# DocuBridge: AI-Powered Hanko Verification & Document Management System

An enterprise-grade document processing and ingestion architecture designed to solve the challenges of manual paperwork and seal validation in corporate workflows. This project digitizes scans, extracts structured metadata using Google Gemini 2.5 Flash OCR, verifies Hanko seal authenticity using Computer Vision (OpenCV and a Siamese CNN), and archives files securely on AWS S3 with PostgreSQL tracking and a dynamic monitoring dashboard.

---

## The Problem
Japanese companies still rely heavily on paper documents and Hanko seals. Manual verification is slow, prone to human error, difficult to scale, and lacks central security audit trails.

## The Solution
An automated, hybrid pipeline that:
1. **Digitizes paper documents**: Ingests scans/PDFs and applies preprocessing filters.
2. **Extracts information automatically**: Harnesses Google Gemini 2.5 Flash for high-accuracy text OCR and structured data extraction (vendor, amount, dates).
3. **Verifies Hanko authenticity**: Compares cropped seals against registered masters using Computer Vision (OpenCV contours and a Siamese Neural Network).
4. **Secures cloud storage**: Saves raw files under AES-256 encryption in AWS S3.
5. **Decides via Confidence Scores**: Auto-approves documents with scores $>90\%$ and routes low-confidence files ($50\% - 90\%$) to human reviewers.
6. **Generates executive analytics**: Displays spending trends, approval queues, and system audit logs in a glassmorphic dashboard.

---

## Technical Architecture

```text
User
   │
   ▼
Web Application
   │
   ▼
Upload Document
   │
   ▼
AWS S3 (Document Storage)
   │
   ▼
OpenCV Pre-processing
   │
   ├───────────────┐
   ▼               ▼
Gemini AI      Computer Vision
(Data Extraction) (Signature/Seal Verification)
        │               │
        └──────┬────────┘
               ▼
      Business Validation
               │
        Confidence Score
               │
     ┌─────────┴─────────┐
     │                   │
 Auto Approve      Human Review
     │                   │
     └─────────┬─────────┘
               ▼
        SQLite (SQL)
               │
               ▼
Dashboard • Reports • Audit Logs
```

---

## Technologies

| Layer | Technology | Description |
|---|---|---|
| **Frontend** | HTML5, CSS3 (Glassmorphism), JavaScript, Bootstrap 5 | Core responsive layouts and layout components |
| **Backend** | Python Flask | API routing, database transactions, and workflow logic |
| **AI Document Extraction** | Google Gemini 2.5 Flash | LLM vision model for structured JSON schema extraction |
| **Image Processing** | OpenCV | Preprocessing (deskew, denoise, seal cropping) |
| **Hanko Verification** | OpenCV + Siamese Neural Network | Deep learning CNN model comparing seal features to database masters |
| **Database** | SQLite (SQLAlchemy ORM) | Tracks documents, validation metrics, and audit trails |
| **Cloud Storage** | AWS S3 (Boto3) | Secure, encrypted object storage for original files |
| **Dashboard** | Plotly.js | Client-side responsive data visualizations |

---

## Getting Started

### 1. Installation
1. Activate your python virtual environment:
   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   ```
2. Install package dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```ini
FLASK_APP=app.py
FLASK_DEBUG=True
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<db_name>

AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_S3_BUCKET=your-s3-bucket-name

GEMINI_API_KEY=your-gemini-api-key
```

### 3. Running local development
Launch Flask:
```bash
flask run
```
The dashboard will run at `http://127.0.0.1:5000/`.
