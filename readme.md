# 🚀 SQL Studio – Full Stack Query Execution Platform

link: https://sql-studio-hrvt.onrender.com/

SQL Studio is a full-stack web application that allows users to:

* Fetch and solve SQL-based assignments
* Execute custom SQL queries
* View real-time results
* Submit solutions
* Store submissions for evaluation

Built using a modern full-stack architecture with React, Express, PostgreSQL, and MongoDB.

---

## 🏗️ Architecture Overview

### System Flow

1. User interacts with React frontend
2. Frontend sends API requests to Express backend
3. Backend validates, processes, and communicates with databases
4. PostgreSQL executes SQL queries
5. JSON responses flow back to frontend

---

## 🧠 Tech Stack

### Frontend

* React
* React Router
* CSS (Custom Styling)
* Fetch API

### Backend

* Node.js
* Express.js
* REST API architecture

### Databases

* PostgreSQL (for SQL execution & assignments)
* pg (PostgreSQL client)

### Deployment

* Render / Backend and Frontend Hosting

---

## 📊 Core Features

### 1️⃣ Assignment Module

* Fetch assignments from PostgreSQL
* Display assignment details
* Allow users to write SQL queries

### 2️⃣ SQL Execution Engine

* User writes custom SQL query
* Backend validates input
* Query executed on PostgreSQL
* Results returned as JSON
* Frontend renders dynamic result table

### 3️⃣ Submission System

* User submits final answer
* Acknowledgement returned
* Submission status displayed

---

## 📂 Project Structure

```
sql-studio/
│
├── frontend/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
│
├── backend/
│   ├── config/
│   ├── routes/
│   ├── services/
│   └── app.js
└───────server.js
```

---

## 🔄 API Endpoints

### Assignments

* `GET /api/assignments`

### Get assignment by ID

* `POST /api/assignments/:id`

### run code

* `POST  /api/assignments/run`

### Submission

* `POST  /api/assignments/submit`

---

## ⚙️ Environment Variables

Backend `.env`

```
DATABASE_URL=your_postgres_connection_string

```

---

## 🛠️ Installation Guide

### Clone Repository

```bash
git clone 
cd sql-studio
```

---

### Install Frontend

```bash
cd frontend
npm install
npm start
```

---

### Install Backend

```bash
cd backend
npm install
npm run dev
```

---

## 🧪 Example Query Flow

User enters:

```sql
SELECT * FROM assignments;
```

Flow:

React → Express → PostgreSQL → Express → React → Table Rendered

---

## 🚨 Security Considerations

* Password hashing implemented
* JWT-based authentication
* Protected API routes
* Server-side query execution
* No direct database exposure to frontend

Future Improvements:

* Query sanitization layer
* Role-based access control
* Query logging system
* Rate limiting middleware

---

## 📈 Learning Outcomes

This project demonstrates:

* Full-stack architecture design
* REST API development
* Authentication & authorization
* SQL query execution handling
* Multi-database architecture (PostgreSQL + MongoDB)
* Clean project structuring
* Production deployment workflow

---

## 💡 Why This Project Matters

SQL Studio simulates a real-world coding assessment platform.

It reflects:

* Backend API structuring
* Database interaction patterns
* Secure authentication
* Frontend state management
* Production-level system flow

---

## 👨‍💻 Author

Pawandeep Kaur
Full-Stack Developer (MERN + Backend Focused)

--