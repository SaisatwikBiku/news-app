# News App

A full-stack news application built with **React**, **Express**, and **MongoDB**, allowing users to browse the latest headlines, search for articles, and **save news items to their personal account**.

![News App Screenshot](<Screenshot 2025-06-29 at 6.36.53 PM.png>)

---

## Features

- Browse top headlines by category (Technology, Business, Health, Sports, Entertainment)
- **User authentication (JWT-based login/signup)**
- **Save and manage news articles per user**
- Search for news by keyword
- Responsive design using Bootstrap
- Graceful error handling for network/API issues

---

## Technologies Used

### Frontend:
- React + Vite
- React Router
- Bootstrap 5
- News API (via [GNews](https://gnews.io))

### Backend:
- Node.js + Express
- MongoDB Atlas (Mongoose)
- JWT (Authentication)
- CORS, dotenv


---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A GNews API key

---

### Backend Setup

1. Navigate to the `backend/` folder:
    ```bash
    cd backend
    ```

2. Create a `.env` file:
    ```
    PORT=8000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    ```

3. Install backend dependencies:
    ```bash
    npm install
    ```

4. Start the server:
    ```bash
    node server.js
    ```

---

### Frontend Setup

1. From the root or `frontend/` directory:
    ```bash
    npm install
    ```

2. Create `.env` with your GNews API key:
    ```
    VITE_API_KEY=your_gnews_api_key
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

---

## Live Demo

Frontend: [https://news-application-self.vercel.app](https://news-application-self.vercel.app)  
Backend: [https://news-app-backend-xyz.onrender.com](https://news-app-backend-xyz.onrender.com)

> Replace with your actual deployed URLs.

---

## Coming Soon / TODO

- Toast notifications for Save/Remove
- Dark mode toggle
- Analytics dashboard
- Saved news history with timestamps

---


