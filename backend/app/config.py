import os

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True  # Optional: prints all SQL queries to the console
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:root@localhost:5432/job_hunting')
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "Bearer")
