# 📝 Task Management App — MERN Stack

A full-stack Task Management Web Application built with MongoDB, Express.js, React.js, and Node.js.

---

##  Features

- User Registration & Login (JWT Authentication)
- Create, Read, Update, Delete Tasks
- Mark tasks as Completed or Pending
- Protected Routes (auth middleware)
- Responsive UI

---

## 🛠️ Tech Stack

Frontend  - React.js, Vite, Axios
Backend   - Node.js, Express.js
Database  - MongoDB, Mongoose
Auth      - JWT (JSON Web Tokens)

---

##  Project Structure

task-management/
├── backend/
│   ├── config/db.js
│   ├── middleware/authMiddleware.js
│   ├── models/User.js
│   ├── models/Task.js
│   ├── routes/authRoutes.js
│   ├── routes/taskRoutes.js
│   ├── .env
│   └── server.js
└── frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── context/AuthContext.jsx
    │   ├── pages/Login.jsx
    │   ├── pages/Register.jsx
    │   └── pages/Dashboard.jsx
    ├── .env
    └── vite.config.js

---

## ⚙️ Setup Instructions

Prerequisites:
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm

1. Clone the Repository

git clone https://github.com/your-username/task-management.git
cd task-management

2. Backend Setup

cd backend
npm install

Create .env file in backend/ folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Start backend:
npm start
Server runs on http://localhost:5000

3. Frontend Setup

cd frontend
npm install

Create .env file in frontend/ folder:

VITE_API_URL=http://localhost:5000/api

Start frontend:
npm run dev
App runs on http://localhost:5173

---

##  API Endpoints

Auth Routes (/api/auth)
POST /register - Register a new user
POST /login    - Login existing user

Task Routes (/api/tasks) - Protected
GET    /     - Get all user tasks
POST   /     - Create a new task
PUT    /:id  - Update a task
DELETE /:id  - Delete a task

---

##  Database Schema

User:
- name: String
- email: String (unique)
- password: String (hashed)

Task:
- title: String
- description: String
- status: pending | completed
- userId: ObjectId (ref: User)

---

##  Author

Rishi Kumar
Email: rishiroy763123@gmail.com

---

## 📄 License

This project is for educational/internship purposes.
