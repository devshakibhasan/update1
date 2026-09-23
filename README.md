# TaskFlow Manager

A MERN stack application for managing daily tasks.

## Project Structure

- `frontend`: React app (Vite + Tailwind CSS)
- `backend`: Node.js + Express + MongoDB backend

## Prerequisites

- Node.js installed
- MongoDB installed locally and running on port 27017 (or update `backend/.env` with your MongoDB Atlas URI)

## Installation & Setup

1. **Clone the repository** (if applicable)

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   - Ensure you have a `.env` file in the `backend` directory (already created) with:
     ```env
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/taskflow
     ```
   - Start the backend server:
     ```bash
     npm run dev
     # or
     node server.js
     ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

## Features
- Add a new task
- View all tasks
- Toggle task completion status
- Delete a task
- Responsive and clean UI using Tailwind CSS

## API Endpoints (Backend)
- `POST /tasks` - Add new task
- `GET /tasks` - Retrieve all tasks
- `DELETE /tasks/:id` - Delete specific task
- `PUT /tasks/:id` - Mark task as completed (or toggle status)
