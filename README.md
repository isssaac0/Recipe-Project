# Élan Cuisine – Full Stack Recipe Management Application

## Project Overview

Élan Cuisine is a full stack web application designed to provide users with an elegant and interactive platform for exploring, creating, and managing recipes. The application integrates modern frontend techniques with a robust backend architecture to deliver a seamless user experience.

The system supports dynamic recipe rendering, advanced filtering, authentication, and multimedia integration through YouTube videos and external image APIs.

---

## Key Features

### User Authentication

* User registration and login functionality
* Secure password hashing using bcrypt
* JSON Web Token (JWT) based authentication
* Persistent login using localStorage
* Logout functionality

---

### Recipe Management

* Create new recipes with multiple attributes
* Automatic image fetching using external API (TheMealDB)
* Store and retrieve recipes from MongoDB
* Delete recipes (role-based access for admin)
* Display recipe details dynamically

---

### Search and Filtering

* Real-time search functionality
* Filter recipes based on:

  * Cuisine
  * Difficulty
  * Category (healthy, dessert, etc.)
  * Vegetarian preference
  * Popularity
  * Preparation time
* Backend-driven filtering using query parameters

---

### Video Integration

* Users can add YouTube links while creating recipes
* Videos are dynamically embedded and played using iframe
* Automatic conversion of YouTube URLs to embed format
* Modal-based video player within the application

---

### User Interface and Experience

* Dynamic rendering of recipe cards using JavaScript
* Responsive layout using modern CSS techniques
* Pagination for efficient data loading
* Custom animated background using HTML Canvas
* Interactive glowing cursor using JavaScript and CSS

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* DOM Manipulation
* Fetch API

---

### Backend

* Node.js
* Express.js

---

### Database

* MongoDB
* Mongoose (ODM)

---

### Additional Libraries

* bcryptjs (password hashing)
* jsonwebtoken (authentication)
* express-validator (input validation)
* dotenv (environment variables)

---

### External APIs

* TheMealDB API (for automatic recipe images)

---

## Project Architecture

The application follows a structured MVC-like architecture:

* Routes: Define API endpoints
* Controllers: Handle business logic
* Models: Define database schema
* Middleware: Handle authentication and validation
* Frontend: Handles UI and user interaction

---

## Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
```

---

### Step 2: Navigate to Project Directory

```bash
cd your-repository
```

---

### Step 3: Install Dependencies

```bash
npm install
```

---

### Step 4: Configure Environment Variables

Create a `.env` file in the root directory and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### Step 5: Run the Application

```bash
node server.js
```

---

### Step 6: Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

---

## Frontend Workflow

1. Page loads and DOMContentLoaded event is triggered
2. Frontend sends API request using fetch()
3. Backend returns recipe data in JSON format
4. Data is dynamically rendered using DOM manipulation
5. User interactions (search, filters, pagination) trigger new API calls
6. Clicking a recipe card opens a video modal if a link is present

---

## Backend Workflow

1. Client sends HTTP request
2. Route receives request and forwards it to controller
3. Controller processes request and interacts with database
4. Middleware handles authentication and validation
5. Response is sent back to frontend in JSON format

---

## Security Considerations

* Passwords are hashed using bcrypt before storage
* JWT tokens are used for authentication and protected routes
* Input validation is performed using express-validator
* Backend validation ensures data integrity even if frontend is bypassed

---

## Known Limitations

* Uses vanilla JavaScript instead of a frontend framework
* Limited role-based access control
* Basic error handling on frontend
* No caching mechanism implemented

---

## Future Enhancements

* Integration with a frontend framework such as React
* Add user profile management
* Implement likes, comments, and ratings
* Add bookmarking or favorite recipes feature
* Improve UI/UX with advanced animations
* Add image upload support

---

## Author

Isaac

---

## License

This project is intended for academic and educational purposes.
