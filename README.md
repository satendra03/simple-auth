# User Management System

This is a simple user management system built with Node.js, Express, and MongoDB. It allows users to sign up and log in.

---

## Features

- User sign-up with name, email, and password
- User login with email and password
- Form validation and error handling
- MongoDB integration for user data storage

---

## Project Structure
```bash
│   .gitignore
│   app.js
│   connection.js
│   package-lock.json
│   package.json
│   README.md
│   
├───controllers
│       index.js
│       users.js
│       
├───models
│       users.js
│       
├───public
│   ├───images
│   ├───javascripts
│   └───stylesheets
│           form.css
│           style.css
│
├───routes
│       index.js
│       users.js
│       
└───views
        error.ejs
        home.ejs
        login.ejs
        signup.ejs
```
---

## License

This project is licensed under the MIT License.