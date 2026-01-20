from flask import Flask
from .config import Config
from app.routes import track
from flask_migrate import Migrate
from .extensions import db, jwt, bcrypt
import os

migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Create upload folder if it doesn't exist
    if not os.path.exists(Config.UPLOAD_FOLDER):
        os.makedirs(Config.UPLOAD_FOLDER)
    
    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    # Register blueprints
    app.register_blueprint(track)

    return app

