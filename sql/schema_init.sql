-- DDL Schema Initialization (PostgreSQL)
-- Hanko-to-Cloud Legacy Pipeline

-- Drop tables if they exist
DROP TABLE IF EXISTS pipeline_logs;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS invoices;

-- Create documents table
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    s3_key VARCHAR(512),
    file_size INTEGER,
    status VARCHAR(50) DEFAULT 'PENDING' NOT NULL,
    extracted_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE
);

-- Create pipeline logs table
CREATE TABLE pipeline_logs (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
    level VARCHAR(20) DEFAULT 'INFO' NOT NULL,
    stage VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Index for faster document lookup
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_created_at ON documents(created_at DESC);
CREATE INDEX idx_pipeline_logs_document_id ON pipeline_logs(document_id);

-- Create invoices table
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    vendor_name VARCHAR(255),
    invoice_number VARCHAR(100),
    invoice_date VARCHAR(50),
    subtotal NUMERIC(12, 2),
    tax NUMERIC(12, 2),
    grand_total NUMERIC(12, 2),
    currency VARCHAR(10),
    hanko BOOLEAN DEFAULT FALSE NOT NULL,
    confidence DOUBLE PRECISION,
    s3_url VARCHAR(512),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Index for invoices lookup
CREATE INDEX idx_invoices_vendor_name ON invoices(vendor_name);
CREATE INDEX idx_invoices_created_at ON invoices(created_at DESC);
