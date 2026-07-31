# Task Management App

A simple Task Management application built with the MERN Stack.

## Tech Stack

- React (Vite)
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Features

- User Signup & Login
- JWT Authentication
- Create Task
- View Tasks
- Update Task
- Delete Task
- Search Tasks
- Pagination

## Project Setup

### 1. Clone the repository

```bash
git clone <repository-url>
```

### 2. Install dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd frontend
npm install
```

### 3. Create Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_jwt_secret
CLIENT_URL=http://localhost:5173
```

Generate a JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Run the Backend

```bash
cd backend
npm run dev
```

### 5. Run the Frontend

```bash
cd frontend
npm run dev
```

The application will run at:

- Frontend: http://localhost:5173
- Backend: http://localhost:5000