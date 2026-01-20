import os

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True  # Optional: prints all SQL queries to the console
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:root@localhost:5432/job_hunting')
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "Bearer")
    
    # File upload settings
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB max file size
    ALLOWED_EXTENSIONS = {'py', 'js', 'java', 'cpp', 'c', 'html', 'css', 'jsx', 'ts', 'tsx', 'go', 'rb', 'php', 'swift', 'kt', 'rs', 'zip', 'tar', 'gz'}
