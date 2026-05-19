# NoteNest - MERN Stack Notes App

## Project Overview

**NoteNest** is a full-stack MERN application that allows users to securely create, manage, organize, and search personal notes.

This project is designed for beginners who want to gain strong backend confidence while also learning frontend integration with APIs.

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Context API
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

---

# Main Features

## Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Password Hashing

## Notes Management

* Create Notes
* Read Notes
* Update Notes
* Delete Notes
* Pin Important Notes
* Search Notes
* Organize Notes with Tags

## Extra Features (Optional)

* Dark Mode
* Archive Notes
* Trash Bin
* Reminder System
* Markdown Support
* File Uploads

---

# Frontend Description

## Frontend Responsibilities

The frontend handles:

* UI rendering
* Form handling
* API calls
* Authentication state
* Protected routes
* User interactions

---

# Frontend Pages

## 1. Home Page

### Features

* Landing page
* Application introduction
* Login/Register buttons

---

## 2. Register Page

### Inputs

* Name
* Email
* Password

### Functionality

* Sends registration request to backend
* Stores JWT token after successful registration

---

## 3. Login Page

### Inputs

* Email
* Password

### Functionality

* Authenticates user
* Stores JWT token

---

## 4. Dashboard Page

### Features

* Display all notes
* Search notes
* Create new note
* Delete note
* Edit note
* Pin note

---

## 5. Create/Edit Note Page

### Inputs

* Title
* Content
* Tags
* Category

---

## 6. Profile Page

### Features

* User information
* Logout button

---

# Frontend Folder Structure

```txt
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── NoteCard.jsx
│   ├── SearchBar.jsx
│   └── Sidebar.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── CreateNote.jsx
│   └── Profile.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── services/
│   └── api.js
│
├── routes/
│   └── ProtectedRoute.jsx
│
├── App.jsx
└── main.jsx
```

---

# Backend Description

## Backend Responsibilities

The backend handles:

* API creation
* Authentication
* Database operations
* Authorization
* Business logic
* Error handling

---

# Backend Architecture

The backend follows:

* MVC Architecture
* REST API principles

---

# Backend Folder Structure

```txt
backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── noteController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Note.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── noteRoutes.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

# Database Models

# User Model

```js
{
  name: String,
  email: String,
  password: String,
  createdAt: Date
}
```

---

# Note Model

```js
{
  user: ObjectId,
  title: String,
  content: String,
  tags: [String],
  isPinned: Boolean,
  category: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

# API Endpoints

# Authentication APIs

## Register User

```http
POST /api/auth/register
```

---

## Login User

```http
POST /api/auth/login
```

---

## Get Current User

```http
GET /api/auth/me
```

---

# Notes APIs

## Create Note

```http
POST /api/notes
```

---

## Get All Notes

```http
GET /api/notes
```

---

## Get Single Note

```http
GET /api/notes/:id
```

---

## Update Note

```http
PUT /api/notes/:id
```

---

## Delete Note

```http
DELETE /api/notes/:id
```

---

## Search Notes

```http
GET /api/notes/search?q=react
```

---

# Authentication Flow

## Registration Flow

1. User enters credentials
2. Password hashed using bcrypt
3. User saved in MongoDB
4. JWT token generated
5. Token sent to frontend

---

## Login Flow

1. User enters email/password
2. Backend verifies credentials
3. JWT token generated
4. Token returned to frontend

---

## Protected Routes Flow

1. Frontend sends JWT token
2. Backend middleware verifies token
3. User gets authorized access

---

# Backend Concepts Learned

## Core Backend Skills

* Express Routing
* Controllers
* Middleware
* REST APIs
* MongoDB CRUD Operations

## Authentication Skills

* JWT Authentication
* Password Hashing
* Authorization
* Protected Routes

## Advanced Beginner Skills

* Pagination
* Search Filtering
* Error Handling
* MVC Architecture
* Environment Variables

---

# Recommended Development Order

# Phase 1

* Setup backend server
* Connect MongoDB
* Setup Express
* Create User model

---

# Phase 2

* Create authentication APIs
* Add JWT authentication
* Add middleware

---

# Phase 3

* Create Notes model
* Build CRUD APIs
* Add search functionality

---

# Phase 4

* Setup React frontend
* Build authentication pages
* Connect APIs using Axios

---

# Phase 5

* Add protected routes
* Improve UI
* Deploy project

---

# Deployment

## Frontend

* Vercel
* Netlify

## Backend

* Render
* Railway

## Database

* MongoDB Atlas

---

# Final Goal

After completing this project, you will understand:

* Full-stack MERN workflow
* Backend architecture
* API development
* Authentication systems
* Database management
* Real-world project structure

This project creates a strong foundation for:

* Social media apps
* E-commerce apps
* SaaS products
* AI applications
* Real-time applications
