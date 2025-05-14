# CV Build Tracker

A modern web application for tracking and managing your job applications and CV building process. Built with React, Flask, and PostgreSQL.

## 🚀 Features

- **Application Tracking**: Track job applications, interviews, and follow-ups
- **CV Management**: Manage multiple CV versions and track their performance
- **Interactive Dashboard**: Visualize your application statistics and success rates
- **Drag-and-Drop Interface**: Intuitive job application status management
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant feedback on application status changes
- **Data Visualization**: Charts and graphs for application analytics

## 🏗️ Tech Stack

### Frontend
- React 18
- Redux Toolkit for state management
- Material-UI and Tailwind CSS for styling
- React Router for navigation
- React Beautiful DnD for drag-and-drop functionality
- Chart.js for data visualization
- Axios for API communication
- React Toastify for notifications

### Backend
- Flask (Python)
- SQLAlchemy ORM
- PostgreSQL database
- Flask-Migrate for database migrations
- Flask-CORS for cross-origin resource sharing
- Alembic for database version control

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- Python 3.8 or higher
- PostgreSQL
- Git

## 📦 Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv env
   .\env\Scripts\activate

   # Unix/MacOS
   python3 -m venv env
   source env/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   Create a `.env` file in the backend directory with the following variables:
   ```
   FLASK_APP=run.py
   FLASK_ENV=development
   DATABASE_URL=postgresql://username:password@localhost:5432/cv_tracker
   SECRET_KEY=your-secret-key
   ```

5. Initialize the database:
   ```bash
   flask db upgrade
   ```

6. Run the backend server:
   ```bash
   flask run
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## 🚀 Running the Application

1. Start the backend server (from the backend directory):
   ```bash
   flask run
   ```

2. Start the frontend development server (from the frontend directory):
   ```bash
   npm start
   ```

3. Access the application at `http://localhost:3000`

## 🧪 Testing

### Backend Tests
```bash
cd backend
python -m pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📁 Project Structure

```
cv-build-tracker/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── migrations/
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by the need for better job application tracking tools 