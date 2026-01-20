# CV Build Tracker 🚀

![CV Build Tracker](https://img.shields.io/badge/CV_Build_Tracker-v1.0.0-blue.svg)
![GitHub Repo Size](https://img.shields.io/github/repo-size/Kali99xx/cv-build-tracker)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Welcome to the **CV Build Tracker** repository! This modern web application helps you track and manage your job applications and CV building process. It combines the power of **React**, **Flask**, and **PostgreSQL** to deliver a seamless experience.

## 🚀 New to the Project?

**Looking to get started?** Check out our comprehensive [**Getting Started Guide**](GETTING_STARTED.md) for detailed, step-by-step instructions on setting up and running the application.

### Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Kali99xx/cv-build-tracker.git
cd cv-build-tracker

# 2. Set up the backend
cd backend
pip install -r requirements.txt
flask db upgrade
flask run

# 3. Set up the frontend (in a new terminal)
cd ../frontend
npm install
npm start
```

Visit `http://localhost:3000` to see the app! For detailed instructions and troubleshooting, see [GETTING_STARTED.md](GETTING_STARTED.md).

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Releases](#releases)

## Features 🌟

- **Track Job Applications**: Easily monitor your job applications and their statuses.
- **CV Builder**: Create and manage your CV in a user-friendly interface.
- **Responsive Design**: Works well on both desktop and mobile devices.
- **Real-time Updates**: Get immediate feedback on your applications and CV changes.
- **User Authentication**: Secure login and user management.

## Tech Stack 🛠️

This project utilizes a range of technologies:

- **Frontend**: 
  - React
  - Redux
  - Tailwind CSS

- **Backend**:
  - Flask
  - Flask-CORS
  - Flask-Migrate
  - SQLAlchemy

- **Database**:
  - PostgreSQL

- **Others**:
  - Node.js
  - ORM

## Installation 🛠️

To set up the project locally, follow these steps:

> 📚 **For detailed, step-by-step instructions including prerequisites, troubleshooting, and more, see our [Getting Started Guide](GETTING_STARTED.md).**

### Prerequisites

- Python 3.8+
- Node.js 14+ and npm
- PostgreSQL 12+
- Git

### Setup Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Kali99xx/cv-build-tracker.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd cv-build-tracker
   ```

3. **Install the backend dependencies**:

   Navigate to the backend folder and install the required packages:

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Set up the database**:

   Make sure you have PostgreSQL installed and create a database for the project. Update the database configuration in the `backend/app/config.py` file if needed.

   ```sql
   CREATE DATABASE job_hunting;
   ```

   Note: The default database name in `config.py` is `job_hunting`, but you can use any name you prefer.

5. **Run database migrations**:

   ```bash
   flask db upgrade
   ```

6. **Start the backend server**:

   ```bash
   flask run
   ```

7. **Install the frontend dependencies** (in a new terminal):

   Navigate to the frontend folder and install the required packages:

   ```bash
   cd ../frontend
   npm install
   ```

8. **Start the frontend server**:

   ```bash
   npm start
   ```

Now, you can access the application at `http://localhost:3000`.

**Need help?** Check the [Troubleshooting section](GETTING_STARTED.md#troubleshooting) in the Getting Started Guide.

## Usage 📖

Once the application is running, you can create an account or log in. Here are some key functionalities:

- **Add Job Applications**: Use the "Add Application" button to input details about your job applications.
- **Edit CV**: Navigate to the CV section to add or modify your CV details.
- **Track Status**: View the status of your applications on the dashboard.

For a more detailed guide, refer to the [documentation](#).

## Contributing 🤝

We welcome contributions! To contribute to the CV Build Tracker, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Make your changes** and commit them:

   ```bash
   git commit -m "Add your feature"
   ```

4. **Push to the branch**:

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a pull request**.

## License 📜

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact 📬

For questions or suggestions, feel free to reach out:

- **Email**: your-email@example.com
- **GitHub**: [Kali99xx](https://github.com/Kali99xx)

## Releases 📦

You can download the latest release of the CV Build Tracker [here](https://github.com/Kali99xx/cv-build-tracker/releases). Follow the instructions to execute the downloaded files.

Check the **Releases** section for updates and new features.

---

Thank you for your interest in the CV Build Tracker! We hope it helps you streamline your job application process and build an impressive CV. Happy job hunting!