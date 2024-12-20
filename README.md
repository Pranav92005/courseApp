# courseApp

A web application to streamline the management of courses, lectures, and materials for students and teachers.

## Features

### General Features
- **Authentication:**
  - OAuth for secure login.
  - JWT for session management.
- **Authorization:**
  - Role-based access control using `zod`.
  - `@gmail.com` emails are assigned the role of `Student`.
  - `@iitbbs.ac.in` emails are assigned the role of `Teacher`.

### Teacher Features
- Create and manage courses.
- Schedule lectures for courses.
- Upload lecture materials and notes.

### Student Features
- View all available courses.
- Enroll in courses.
- Access lectures and materials for enrolled courses.

## Tech Stack

### Frontend
- **Vite**: Build tool for fast and efficient development.
- **React**: UI library for building user interfaces.
- **TypeScript**: Strongly typed JavaScript for better development experience.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **sadcn**: Pre-built UI components for consistent design.

### Backend
- **Node.js**: Runtime environment for server-side JavaScript.
- **Express.js**: Web framework for building the server.
- **MongoDB**: NoSQL database for data persistence.

### Security
- **JWT**: For authentication and authorization.
- **zod**: For schema validation and role-based authorization.
- **OAuth**: For secure user login.



## Installation and Setup

### Prerequisites
- Node.js (>=16.x)
- npm or yarn
- MongoDB instance

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Pranav92005/courseApp.git
   cd course-app
   ```
2. Install dependencies:
   ```bash
   # For frontend
   cd Frontend1
   npm install
   # For backend
   cd ../backend
   npm install
   ```
3. Configure environment variables:
   - Create `.env` files in both `client` and `server` directories.
   - Specify required configurations (e.g., database URI, OAuth credentials).
4. Start the development servers:
   ```bash
   # Frontend
   cd Frontend1
   npm run dev
   # Backend
   cd ../backend
   node src/index.js
   ```
5. Open the app in your browser at `http://localhost:5173`.

