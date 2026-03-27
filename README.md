# Note Taking App

A full-stack note-taking application built with React and Express.js.

## Overview

This is a simple but fully functional note-taking application with:
- **Frontend**: React 19 with TypeScript
- **Backend**: Express.js with TypeScript
- **Storage**: In-memory (data persists during server session)

## Project Structure

```
note-taking-app/
├── frontend/          # React frontend (CRA)
│   └── src/
│       ├── App.tsx    # Main component with CRUD UI
│       ├── index.tsx  # React entry point
│       └── index.css  # Styles
├── backend/           # Express.js backend
│   └── src/
│       ├── index.ts   # Server setup with CORS
│       ├── controllers/
│       │   └── noteController.ts  # Note CRUD handlers
│       ├── routes/
│       │   └── notes.ts           # Note API routes
│       └── models/
│           └── note.ts            # Note interface
└── README.md
```

## Features

- ✅ Create notes with title and content
- ✅ View all notes with creation timestamp
- ✅ Edit existing notes inline
- ✅ Delete notes
- ✅ Success/error feedback messages
- ✅ Cross-origin support (CORS enabled)

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

## Available Scripts

### Frontend
- `npm run dev` - Start development server (alias for `npm start`)
- `npm start` - Start development server with hot reload
- `npm run build` - Build for production
- `npm test` - Run tests

### Backend
- `npm run dev` - Start with nodemon (auto-reload on file changes)
- `npm start` - Run compiled server from dist/
- `npm run build` - Compile TypeScript to JavaScript

## API Endpoints

All endpoints are prefixed with `/api/notes`

| Method | Endpoint    | Description |
|--------|------------|-------------|
| GET    | `/`        | Get all notes |
| POST   | `/`        | Create a new note |
| GET    | `/:id`     | Get a specific note |
| PUT    | `/:id`     | Update a note |
| DELETE | `/:id`     | Delete a note |

## Tech Stack

**Frontend**
- React 19
- TypeScript
- Axios (HTTP client)

**Backend**
- Express.js 5
- TypeScript
- CORS (cross-origin support)

**Development**
- ts-node (TypeScript execution)
- nodemon (auto-restart on changes)
- React Scripts (CRA bundler)

## Notes

- Data is stored in-memory and will reset when the backend restarts
- No external database is connected (MongoDB, PostgreSQL, etc.)
- Perfect for local development and learning
