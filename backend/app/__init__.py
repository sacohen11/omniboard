import os
from flask import Flask, g, current_app
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import random

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()

# Added User model import
from app.models.users import User

def create_app(config=None):
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_mapping(
        SECRET_KEY=os.environ.get('SECRET_KEY', 'dev_key'),
        SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL', 'postgresql://postgres:postgres@postgres:5432/omniboard'),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        # Initialize the user role config key
        CURRENT_USER_ROLE = 'user' # Default role
    )
    
    # Override config if provided
    if config:
        app.config.from_mapping(config)
    
    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    
    # --- Select Random User ONCE on Startup --- 
    with app.app_context():
        selected_role = 'user' # Default
        selected_name = 'Unknown'
        try:
            users = User.query.all()
            if users:
                selected_user = random.choice(users)
                selected_role = selected_user.role
                selected_name = selected_user.name
                print(f"*** [Startup] Selected user: {selected_name} (Role: {selected_role}) ***")
            else:
                print("*** [Startup] No users found in DB, defaulting to role: user ***")
        except Exception as e:
            print(f"*** [Startup] Error fetching users: {e}, defaulting to role: user ***")
        
        # Store the selected role in app.config for persistence
        app.config['CURRENT_USER_ROLE'] = selected_role
    # --- End User Selection --- 

    # Enable CORS
    CORS(app)
    
    # Register blueprints
    from app.api.links import bp as links_bp
    app.register_blueprint(links_bp, url_prefix='/api')
    
    from app.api.admin import bp as admin_bp
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    
    # Add a new blueprint for auth
    from app.api.auth import bp as auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    @app.route('/api/health')
    def health_check():
        return {'status': 'ok'}
    
    return app 