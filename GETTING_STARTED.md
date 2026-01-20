# Getting Started with CV Build Tracker 🚀

Welcome! This guide will help you get the CV Build Tracker application up and running on your local machine.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup Instructions](#detailed-setup-instructions)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Python 3.8+** - Backend framework
   - Download: [python.org](https://www.python.org/downloads/)
   - Verify installation: `python --version` or `python3 --version`

2. **Node.js 14+ and npm** - Frontend framework
   - Download: [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

3. **PostgreSQL 12+** - Database
   - Download: [postgresql.org](https://www.postgresql.org/download/)
   - Verify installation: `psql --version`

4. **Git** - Version control
   - Download: [git-scm.com](https://git-scm.com/)
   - Verify installation: `git --version`

### Optional but Recommended

- **Virtual Environment Tool** (venv, virtualenv, or conda) - For Python dependency isolation
- **Code Editor** - VS Code, PyCharm, or your preferred IDE
- **PostgreSQL GUI** - pgAdmin, DBeaver, or similar (for easier database management)

## Quick Start

If you're familiar with web development, here's the fast track:

```bash
# Clone the repository
git clone https://github.com/Kali99xx/cv-build-tracker.git
cd cv-build-tracker

# Backend setup
cd backend
pip install -r requirements.txt
# Configure database in app/config.py
flask db upgrade
flask run

# Frontend setup (in a new terminal)
cd ../frontend
npm install
npm start
```

Visit `http://localhost:3000` to see the application!

## Detailed Setup Instructions

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/Kali99xx/cv-build-tracker.git
cd cv-build-tracker
```

This creates a local copy of the project on your machine.

### 2. Backend Setup

The backend is built with Flask and uses PostgreSQL for data storage.

#### Step 2.1: Set Up Python Virtual Environment (Recommended)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

#### Step 2.2: Install Python Dependencies

```bash
pip install -r requirements.txt
```

This installs all necessary Python packages including Flask, SQLAlchemy, and PostgreSQL adapter.

#### Step 2.3: Configure the Database

1. **Create a PostgreSQL database:**

   ```bash
   # Log into PostgreSQL
   psql -U postgres
   
   # Create database (using default name from config)
   CREATE DATABASE job_hunting;
   
   # Create user (optional)
   CREATE USER cv_user WITH PASSWORD 'your_password';
   
   # Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE job_hunting TO cv_user;
   
   # Exit PostgreSQL
   \q
   ```

2. **Update database configuration:**

   Open `backend/app/config.py` and review the database connection string. The config uses environment variables for security:

   ```python
   SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:root@localhost:5432/job_hunting')
   ```

   The default fallback uses `postgres` as username and `root` as password, but **you should change these** for security.
   
   **Recommended approach** - Set an environment variable:
   ```bash
   export DATABASE_URL='postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/job_hunting'
   ```
   
   Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your actual PostgreSQL credentials.
   
   **Alternative approach** - Edit the default value in config.py, but remember to use environment variables in production.
   
   **Important**: Never commit real database credentials to version control. Use environment variables, especially in production environments.
   
   The database name is `job_hunting` as shown in the config file, but you can change it to your preferred name (e.g., `cv_tracker`).

#### Step 2.4: Initialize the Database

```bash
# Run database migrations
flask db upgrade
```

This creates all necessary tables in your database.

#### Step 2.5: Start the Backend Server

```bash
flask run
```

Or if you prefer to run with the configuration in `run.py`:

```bash
python run.py
```

The backend API should now be running at `http://localhost:5000`

### 3. Frontend Setup

The frontend is built with React and uses modern JavaScript libraries.

#### Step 3.1: Navigate to Frontend Directory

Open a **new terminal window** (keep the backend running) and navigate to the frontend:

```bash
cd frontend
```

#### Step 3.2: Install Node Dependencies

```bash
npm install
```

This may take a few minutes as it downloads all required packages including React, Redux, and Tailwind CSS.

#### Step 3.3: Configure API Endpoint (if needed)

If your backend is running on a different port or host, update the API endpoint in your frontend configuration files.

#### Step 3.4: Start the Frontend Development Server

```bash
npm start
```

The frontend should automatically open in your browser at `http://localhost:3000`

## Running the Application

Once both servers are running:

1. **Backend**: Running at `http://localhost:5000`
2. **Frontend**: Running at `http://localhost:3000`

You should see the CV Build Tracker application in your browser!

### First Time Use

1. **Create an account** - Click on the sign-up button
2. **Log in** - Use your credentials to access the dashboard
3. **Explore features**:
   - Add job applications
   - Build and manage your CV
   - Track application statuses

## Troubleshooting

### Common Issues and Solutions

#### Issue: "Module not found" or "Package not found"

**Solution**: Make sure you've installed all dependencies:
- Backend: `pip install -r requirements.txt`
- Frontend: `npm install`

#### Issue: Database connection errors

**Solution**: 
- Verify PostgreSQL is running: `psql -U postgres`
- Check database credentials in `backend/app/config.py`
- Ensure the database exists: `CREATE DATABASE job_hunting;`

#### Issue: Port already in use

**Solution**:
- Backend: Change the port in `backend/run.py` (look for the line with `app.run(host='...', port=5000, ...)` and change `port=5000` to a different port like `port=5001`)
- Frontend: React will automatically prompt you to use a different port

#### Issue: CORS errors in the browser

**Solution**: 
- Ensure Flask-CORS is properly configured in `backend/run.py`
- Check that both servers are running

#### Issue: "flask: command not found"

**Solution**: 
- Make sure your virtual environment is activated (you should see `(venv)` in your terminal prompt)
- Verify requirements are installed: `pip install -r requirements.txt`
- If still not working, try: `python -m flask --version` to check if Flask is installed

#### Issue: npm install fails

**Solution**:
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again
- Try using a different Node.js version (use nvm if available)

### Getting Help

If you encounter issues not listed here:

1. Check the [Issues](https://github.com/Kali99xx/cv-build-tracker/issues) page on GitHub
2. Review the main [README.md](README.md) for additional documentation
3. Open a new issue with:
   - Your operating system
   - Error message (full stack trace)
   - Steps to reproduce the problem

## Next Steps

Now that you have the application running, here are some things you can do:

### For Users

- **Customize your CV** - Add your personal information, work experience, and skills
- **Track applications** - Keep a record of all your job applications
- **Monitor progress** - Use the dashboard to see your application statistics

### For Developers

- **Explore the codebase**:
  - `backend/app/models.py` - Database models
  - `backend/app/routes.py` - API endpoints
  - `frontend/src/` - React components and pages
  
- **Make changes**:
  - See the [Contributing section](README.md#contributing-) in the README for contribution guidelines
  - Create a new branch for your feature: `git checkout -b feature/my-feature`
  
- **Learn the tech stack**:
  - [Flask Documentation](https://flask.palletsprojects.com/)
  - [React Documentation](https://react.dev/)
  - [Redux Toolkit](https://redux-toolkit.js.org/)
  - [Tailwind CSS](https://tailwindcss.com/)

### Development Workflow

1. **Make changes** to the code
2. **Test locally** - Both servers auto-reload on file changes
3. **Run tests**: 
   - Frontend: `npm test`
   - Backend: Add tests as needed
4. **Commit changes**: `git commit -m "Description of changes"`
5. **Push to your fork**: `git push origin your-branch-name`
6. **Create a Pull Request** on GitHub

---

**Congratulations!** 🎉 You now have the CV Build Tracker up and running. Happy coding!

For more information, check out the main [README.md](README.md) file.
