 🚀 Project Name: Porsino
An Open-Source Online Examination & Assessment Platform
 
 📝 Description
This is a full-featured Online Examination System designed to facilitate remote testing. It allows educators to create, manage, and grade exams while providing students with a seamless, timed, and secure testing environment.
 
 ✨ Key Features

* Role-Based Access: Separate dashboards for Admins, Teachers, and Students.
* Question Bank: Support for multiple formats (MCQs, True/False, Short Answer).
* Auto-Grading: Instant result calculation for objective questions.
* Timer & Security: Real-time countdowns and window-blur detection (anti-cheating).
* Analytics: Detailed performance reports and statistics for teachers.
* Responsive Design: Fully functional on mobile and desktop.


🛠 Tech Stack

* Frontend: [React.js]
* Backend: [Node.js & Express]
* Database: [mysql]
* Caching: [e.g., Redis for session management]


⚙️ Installation & Setup

   1. Clone the repo:
   
   git clone https://github.com
   
   2. Install dependencies:
   
   npm install  # or your specific command
   
   3. Environment Variables: Create a .env file and add your database credentials.
   4. Run the project:
   
   npm start
   
   
📸 Screenshots

This part adding during making Project

Latest backend and frontend directory structure :
ساختار دارکتوری پروژه تا الان :
● Backend Directory Structure

  .
  ├── config
  │   └── db.js
  ├── controllers
  │   ├── authController.js
  │   ├── userController.js
  │   └── productController.js
  ├── middleware
  │   ├── auth.js
  │   ├── errorHandler.js
  │   └── logger.js
  ├── prisma
  │   ├── schema.prisma
  │   └── migrations
  │       └── 20231001000000_initial_migration.sql
  ├── routes
  │   ├── authRoutes.js
  │   ├── userRoutes.js
  │   └── productRoutes.js
  ├── server.js
  ├── package.json
  ├── prisma.config.ts
  └── .env

  Frontend Directory Structure

  .
  ├── public
  │   └── index.html
  │   ├── build
  │   │   ├── local
  │   │      ├── en
  │   │      └── fa
  ├── src
  │   ├── pages
  │   │   ├── Home.jsx
  │   │   ├── Login.jsx
  │   │   └── Dashboard.jsx
  │   ├── styles
  │   │   ├── global.css
  │   │   └── index.css
  │   ├── App.jsx
  │   ├── index.jsx
  ├── package.json
  └── package-lock.json
