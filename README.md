# Library Management App
_Current version: v1.1_

This is a simple fullstack web app for library management, built using the MERN stack.


<!-- ABOUT THE PROJECT -->

## 🔰 About the project

The system allows **Librarians** and **Members** to login to the web app (using accounts created by librarians)

Lbrarians can:
- Manage (CRUD)
  - Authors
  - Genres
  - Books
  - Borrowals
  - Users

Members can:
- View (R)
  - Authors
  - Genres
  - Books
  - Own borrowals
- Add (C)
  - Own borrowals
  



1. cd to project folder (LibraryManagement)
2. Run the following commands in terminal:
  - To install NPM packages
```
npm run install
```
  - To start both server and client applications
```
npm start
```



file structure:
.
├── client
│   ├── public
│   │   ├── assets
│   │   └── index.html
│   └── src
│       ├── hooks
│       ├── sections
│       │   ├── @dashboard
│       │   │   ├── app
│       │   │   ├── author
│       │   │   ├── book
│       │   │   ├── borrowal
│       │   │   ├── genre
│       │   │   └── user
|       │   └── auth
│       │       └── login
│       ├── utils
│       ├── App.jsx
│       ├── index.js
│       ├── constants.js
│       └── routes.js
│
├── server
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── index.js
│   └── passport-config.js
│
├── package.json
├── README.md
└── LICENSE.md
```
