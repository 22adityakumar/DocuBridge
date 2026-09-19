from datetime import datetime
from database import db

class Invoice(db.Model):
    """
    Model representing parsed invoice details extracted via the legacy pipeline.
    """
    __tablename__ = 'invoices'

    id = db.Column(db.Integer, primary_key=True)
    document_id = db.Column(db.Integer, db.ForeignKey('documents.id', ondelete='SET NULL'), nullable=True)
    vendor_name = db.Column(db.String(255), nullable=True)
    invoice_number = db.Column(db.String(100), nullable=True)
    invoice_date = db.Column(db.String(50), nullable=True)  # Stored as string to handle raw extraction variations
    subtotal = db.Column(db.Numeric(12, 2), nullable=True)
    tax = db.Column(db.Numeric(12, 2), nullable=True)
    grand_total = db.Column(db.Numeric(12, 2), nullable=True)
    currency = db.Column(db.String(10), nullable=True)
    hanko = db.Column(db.Boolean, default=False, nullable=False)
    confidence = db.Column(db.Float, nullable=True)
    s3_url = db.Column(db.String(512), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    document = db.relationship('Document', backref=db.backref('invoices', lazy=True))

    def to_dict(self):
        """Converts model instance to dictionary representation."""
        return {
            "id": self.id,
            "document_id": self.document_id,
            "document_name": self.document.filename if self.document else None,
            "vendor_name": self.vendor_name,
            "invoice_number": self.invoice_number,
            "invoice_date": self.invoice_date,
            "subtotal": float(self.subtotal) if self.subtotal is not None else None,
            "tax": float(self.tax) if self.tax is not None else None,
            "grand_total": float(self.grand_total) if self.grand_total is not None else None,
            "currency": self.currency,
            "hanko": self.hanko,
            "confidence": self.confidence,
            "s3_url": self.s3_url,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
