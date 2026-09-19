import os
import logging
from flask import Flask, jsonify
from config import config_by_name
from database import init_db
from dashboard import dashboard_bp

def create_app(config_name=None):
    """
    Application factory for the Hanko-to-Cloud Legacy Pipeline.
    """
    if not config_name:
        config_name = os.getenv("FLASK_ENV", "development")
        
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config_by_name.get(config_name, config_by_name["default"]))
    
    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format="[%(asctime)s] %(levelname)s in %(module)s: %(message)s"
    )
    
    # Initialize DB (Flask-SQLAlchemy)
    try:
        init_db(app)
        app.logger.info("Database initialized successfully.")
    except Exception as e:
        app.logger.error(f"Failed to initialize database: {e}")
        # Note: Do not block app initialization in dev/testing environments if database is not reachable immediately
        if config_name == "production":
            raise e

    # Register Blueprints
    app.register_blueprint(dashboard_bp)
    
    # Global Error Handlers
    @app.errorhandler(404)
    def page_not_found(e):
        return jsonify({"error": "Resource not found"}), 404

    @app.errorhandler(500)
    def internal_server_error(e):
        return jsonify({"error": "Internal server error"}), 500

    return app

# Development entry point
app = create_app()

if __name__ == '__main__':
    # Retrieve port from env or default to 5000
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
