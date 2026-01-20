from .extensions import db
from datetime import datetime

class Steps(db.Model):
    __tablename__ = 'steps'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    
class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), unique=True, nullable=False)  # Unique User ID
    password = db.Column(db.String(255), nullable=False)  # Hashed Password
    role = db.Column(db.Integer, nullable=False, default=1)  # 0 = Admin, 1 = User
    
class Account_Users(db.Model):
    __tablename__ = 'account_users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, unique=False, nullable=False)
    name = db.Column(db.String(80), unique=True, nullable=False)
    
class Accounts(db.Model):
    __tablename__ = 'accounts'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(20), unique=True, nullable=False)
    
class Items(db.Model):
    __tablename__ = 'items'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    row_idx = db.Column(db.Integer, unique=False, nullable=False)
    col_idx = db.Column(db.Integer, unique=False, nullable=False)
    step_id = db.Column(db.Integer, db.ForeignKey('steps.id'), nullable=False)
    step = db.relationship('Steps', backref=db.backref('items', lazy=True))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('Users', backref=db.backref('items', lazy=True))
    site_id = db.Column(db.Integer, db.ForeignKey('accounts.id'), nullable=False)
    site = db.relationship('Accounts', backref=db.backref('items', lazy=True))
    account_user_id = db.Column(db.Integer, db.ForeignKey('account_users.id'), nullable=False)
    account_user = db.relationship('Account_Users', backref=db.backref('items', lazy=True))
    content = db.Column(db.String(5000), unique=False, nullable=False)
    company_name = db.Column(db.String(80), unique=False, nullable=False)
    job_des = db.Column(db.String(5000), unique=False, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

        
class Techs(db.Model):
    __tablename__ = 'techs'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    company_name = db.Column(db.String(80), unique=False, nullable=False)
    company_url = db.Column(db.String(5000), unique=False, nullable=False)
    video_source = db.Column(db.String(80), unique=False, nullable=False)
    job_role = db.Column(db.String(80), unique=False, nullable=False)
    job_des = db.Column(db.String(5000), unique=False, nullable=True)

class Projects(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('Users', backref=db.backref('projects', lazy=True))
    project_name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.String(5000), nullable=True)
    file_name = db.Column(db.String(500), nullable=False)
    file_path = db.Column(db.String(1000), nullable=False)
    file_size = db.Column(db.Integer, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)