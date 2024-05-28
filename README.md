# TaskTick Backend API

This repository provides the robust backend API for the TaskTick to-do application. It offers a secure and scalable foundation for managing user accounts, tasks, and authentication.

Tech Stack:

- Backend Framework: Express.js
- Database ORM: Prisma
- Database: PostgreSQL
- Security: bcryptjs (Salting & Hashing)
- Environment Variables: dotenv
- Authentication: JSON Web Tokens (JWT)
- Deployment: Render.com

Key Features:

- Secure user authentication with JWT tokens
- User registration and login functionalities
- Efficient management of task data (CRUD operations)
- Integration with Prisma for seamless database interactions
- Robust security measures with bcryptjs for password storage

Things You Learned:

- Salting and Hashing: Implemented salting to enhance password security by adding a random string before hashing.
- JWT Authentication: Utilized JSON Web Tokens to establish secure communication between client and server.
- Backend Deployment: Successfully deployed the backend API on Render.com.


Getting Started:

1. Clone the repository:
   ```bash
   git clone https://github.com/Dhruviika/Todo_Backend.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables.
4. Run:
   ```bash
   npm run dev
   ```



