# Back-End API

A RESTful API built with **Node.js** and **Express.js**, connected to a **MySQL** database.

---

## Tech Stack

| Layer     | Technology          |
| --------- | ------------------- |
| Runtime   | Node.js             |
| Framework | Express.js v5       |
| Database  | MySQL               |
| Auth      | bcrypt, JWT (ready) |
| Other     | CORS, dotenv        |

---

### Courses

#### Get All Courses

GET /courses

Response 200:

json

{

“status”: “success”,

“data”: [

{

“id”: 1,

“title”: “Course Title”,

“description”: “…”

}

]

}

Errors:

Status Message
500 Internal Server Error

---

## Project Structure

server/

└── src/

├── config/

│ └── db.js # MySQL connection / query runner

├── controllers/

│ ├── auth.controller.js # register, login

│ └── courses.controller.js # getCoursesController

├── router/

│ └── users.router.js # /users routes

├── services/

│ └── auth.services.js # Business logic for auth

├── repositories/

│ ├── user.repository.js # findUserByEmail, createUser, getUsers

│ └── courses.repository.js # getCourses

├── middlewares/ # Error handler, 404

└── utils/

├── catchAsync.js # Async error wrapper

└── AppError.js # Custom error class

# Use

Getting Started
Prerequisites
Node.js >= 18
MySQL database
Installation
bash

git clone https://github.com/your-username/your-repo.git

cd server

npm install
