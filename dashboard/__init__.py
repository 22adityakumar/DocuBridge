from flask import Blueprint

# Initialize the Blueprint for the dashboard
dashboard_bp = Blueprint(
    'dashboard', 
    __name__,
    template_folder='../templates',
    static_folder='../static'
)

# Import routes to register them with the blueprint
from dashboard import routes
