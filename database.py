from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy
db = SQLAlchemy()

def init_db(app):
    """
    Initializes the database with the Flask application context.
    """
    db.init_app(app)
    
    # Create tables if they do not exist
    with app.app_context():
        import models  # Import models to ensure they are registered
        db.create_all()
