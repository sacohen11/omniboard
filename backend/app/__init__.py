import os
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()

def create_app(config=None):
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_mapping(
        SECRET_KEY=os.environ.get('SECRET_KEY', 'dev_key'),
        SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL', 'postgresql://postgres:postgres@postgres:5432/omniboard'),
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )
    
    # Override config if provided
    if config:
        app.config.from_mapping(config)
    
    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Enable CORS
    CORS(app)
    
    # Register blueprints
    from app.api.links import bp as links_bp
    app.register_blueprint(links_bp, url_prefix='/api')
    
    from app.api.admin import bp as admin_bp
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    
    @app.route('/api/health')
    def health_check():
        return {'status': 'ok'}
    
    return app 