# Blog Portfolio Web Application

## 1. Project Overview

The Blog Portfolio Web Application is a full-stack web application developed to manage and display blog posts. Users can register, log in, view blog posts, and like their favorite posts. An authorized administrator can create, edit, and delete blog posts.

The application uses React for the frontend, Node.js and Express.js for the backend, MongoDB for data storage, and Firebase Authentication for user authentication and admin authorization.

## 2. Project Objectives

- Develop a full-stack web application.
- Integrate MongoDB to store and manage blog posts.
- Implement user registration and login using Firebase Authentication.
- Provide secure administrator access for blog management.
- Connect the frontend and backend through REST API endpoints.

## 3. Technologies Used

| Component | Technology |
|---|---|
| Frontend | React.js |
| Routing | React Router |
| Styling | Tailwind CSS |
| HTTP Requests | Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | Firebase Authentication |
| Backend Authentication | Firebase Admin SDK |


*Note: The structure above is representative. Your actual source folders may differ.*

## 4. Features

### User Features
- Register using an email address and password.
- Log in and log out securely.
- Receive success and error messages during authentication.
- View available blog posts.
- Like blog posts.

### Administrator Features
- Access blog management controls using an authorized administrator account.
- Create new blog posts.
- Edit existing blog titles and content.
- Delete blog posts.

### Security Features
- Firebase Authentication for user identity verification.
- Firebase ID token verification on protected backend routes.
- Administrator UID verification before allowing blog management operations.
- Public access to viewing and liking posts, while creating, editing, and deleting posts require administrator authorization.

## 5. Database Configuration

The application uses MongoDB to store blog post information.

**Database name:** `blogDB`

The blog collection stores fields such as:

- `newTitle` — blog title.
- `newContent` — blog content.
- `date` — blog date.
- `likes` — number of likes.

Make sure MongoDB is running before starting the backend.

The backend MongoDB connection is configured in the backend source code. For the local development setup, the connection URI is:

```text
mongodb://localhost:27017/blogDB
```

## 6. Firebase Configuration

Firebase Authentication is used for user registration and login. The Firebase Admin SDK verifies authentication tokens and restricts administrator-only operations.

Before running the application:

1. Create or configure a Firebase project.
2. Enable Email/Password sign-in in Firebase Authentication.
3. Configure the Firebase web settings in the frontend.
4. Configure Firebase Admin credentials securely in the backend.
5. Configure the authorized administrator UID in the frontend and backend as required by the application.

**Security note:** Never commit Firebase service-account private keys or other secret credentials to a public repository.

## 7. Installation and Setup

### Prerequisites

Install the following:

- Node.js and npm.
- MongoDB.
- A Firebase project configured for Email/Password Authentication.

### Step 1: Start the Backend

Open a terminal and run:

```bash
cd blog-project-starter-backend
npm install
node index.js
```

The backend runs at:

```text
http://localhost:5000
```

Keep this terminal open while using the application.

### Step 2: Start the Frontend

Open a second terminal and run:

```bash
cd blog-project-starter-frontend
npm install
npm start
```

The frontend runs at:

```text
http://localhost:3000
```

Open the frontend URL in your browser to use the application.


## 8. Running the Application

1. Ensure MongoDB is running.
2. Start the backend on port `5000`.
3. Start the frontend on port `3000`.
4. Register or log in using Firebase Authentication.
5. View and like blog posts.
6. Log in using the authorized administrator account to manage blog content.

## 9. Future Enhancements

Possible future improvements include:

- Blog search and category filtering.
- Rich-text editing for blog content.
- Pagination for large numbers of blog posts.
- Improved responsive design and accessibility.
- Automated testing and deployment.

## 10. Conclusion

The Blog Portfolio Web Application demonstrates full-stack development through the integration of React, Express.js, MongoDB, and Firebase Authentication. It provides blog viewing and liking features, administrator content management, and protected backend operations.

## Author

Developed as an academic project.
