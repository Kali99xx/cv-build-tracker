# app/extensions.py
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()  # ✅ Initialize here
jwt = JWTManager()  # ✅ Initialize JWTManager globally
db = SQLAlchemy()
