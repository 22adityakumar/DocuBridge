import logging
from database import db
from models.invoice import Invoice

logger = logging.getLogger(__name__)

def create_invoice(vendor_name=None, invoice_number=None, invoice_date=None, 
                   subtotal=None, tax=None, grand_total=None, currency=None, 
                   hanko=False, confidence=None, s3_url=None) -> Invoice:
    """
    Creates and saves a new Invoice record in the database.
    """
    try:
        new_invoice = Invoice(
            vendor_name=vendor_name,
            invoice_number=invoice_number,
            invoice_date=invoice_date,
            subtotal=subtotal,
            tax=tax,
            grand_total=grand_total,
            currency=currency,
            hanko=hanko,
            confidence=confidence,
            s3_url=s3_url
        )
        db.session.add(new_invoice)
        db.session.commit()
        logger.info(f"Created Invoice in DB: ID #{new_invoice.id}")
        return new_invoice
    except Exception as e:
        db.session.rollback()
        logger.error(f"Failed to create invoice in database: {e}")
        raise e

def get_invoice_by_id(invoice_id: int) -> Invoice:
    """
    Retrieves a single Invoice record by its primary key ID.
    """
    try:
        return Invoice.query.get(invoice_id)
    except Exception as e:
        logger.error(f"Failed to fetch invoice ID #{invoice_id}: {e}")
        return None

def get_all_invoices(limit: int = 100, offset: int = 0) -> list:
    """
    Retrieves a list of invoices with optional pagination (limit/offset).
    """
    try:
        return Invoice.query.order_by(Invoice.created_at.desc()).limit(limit).offset(offset).all()
    except Exception as e:
        logger.error(f"Failed to fetch invoices: {e}")
        return []

def update_invoice(invoice_id: int, **kwargs) -> Invoice:
    """
    Updates designated attributes of an existing Invoice record.
    """
    try:
        invoice = Invoice.query.get(invoice_id)
        if not invoice:
            logger.warning(f"Invoice ID #{invoice_id} not found for update.")
            return None

        # Dynamically assign columns from kwargs
        valid_columns = [c.key for c in Invoice.__table__.columns]
        for key, value in kwargs.items():
            if key in valid_columns and key != 'id':
                setattr(invoice, key, value)

        db.session.commit()
        logger.info(f"Updated Invoice ID #{invoice_id} successfully.")
        return invoice
    except Exception as e:
        db.session.rollback()
        logger.error(f"Failed to update invoice ID #{invoice_id}: {e}")
        raise e

def delete_invoice(invoice_id: int) -> bool:
    """
    Deletes an Invoice record by ID from the database.
    """
    try:
        invoice = Invoice.query.get(invoice_id)
        if not invoice:
            logger.warning(f"Invoice ID #{invoice_id} not found for deletion.")
            return False

        db.session.delete(invoice)
        db.session.commit()
        logger.info(f"Deleted Invoice ID #{invoice_id} from database.")
        return True
    except Exception as e:
        db.session.rollback()
        logger.error(f"Failed to delete invoice ID #{invoice_id}: {e}")
        raise e
