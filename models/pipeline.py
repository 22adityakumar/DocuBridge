from datetime import datetime
from database import db

class PipelineLog(db.Model):
    """
    Model representing pipeline event logs for traceability.
    """
    __tablename__ = 'pipeline_logs'

    id = db.Column(db.Integer, primary_key=True)
    document_id = db.Column(db.Integer, db.ForeignKey('documents.id', ondelete='CASCADE'), nullable=True)
    level = db.Column(db.String(20), default='INFO', nullable=False)  # INFO, WARNING, ERROR
    stage = db.Column(db.String(50), nullable=False)  # UPLOAD, S3_UPLOAD, GEMINI_PROCESS, DB_WRITE
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    document = db.relationship('Document', backref=db.backref('logs', lazy=True, cascade='all, delete-orphan'))

    def to_dict(self):
        """Converts model instance to dictionary representation."""
        return {
            "id": self.id,
            "document_id": self.document_id,
            "level": self.level,
            "stage": self.stage,
            "message": self.message,
            "timestamp": self.timestamp.isoformat() if self.timestamp else None,
        }
