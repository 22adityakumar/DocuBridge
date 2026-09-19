from datetime import datetime
from database import db
class Document(db.Model):
    """
    Model representing a document uploaded and processed through the pipeline.
    """
    __tablename__ = 'documents'

    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    s3_key = db.Column(db.String(512), nullable=True)
    file_size = db.Column(db.Integer, nullable=True)  # in bytes
    status = db.Column(db.String(50), default='PENDING', nullable=False)  # PENDING, UPLOADED, PROCESSED, FAILED
    
    # JSON field for storing structured extraction results from Google Gemini
    extracted_data = db.Column(db.JSON, nullable=True)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    processed_at = db.Column(db.DateTime, nullable=True)

    def to_dict(self):
        """Converts model instance to dictionary representation."""
        return {
            "id": self.id,
            "filename": self.filename,
            "s3_key": self.s3_key,
            "file_size": self.file_size,
            "status": self.status,
            "extracted_data": self.extracted_data,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "processed_at": self.processed_at.isoformat() if self.processed_at else None,
        }
