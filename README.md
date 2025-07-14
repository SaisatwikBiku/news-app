# News App

A full-stack news application built with **React**, **Express**, and **MongoDB**, allowing users to browse the latest headlines, search for articles, and **save news items to their personal account**.

![News App Screenshot](<Screenshot 2025-06-29 at 6.36.53 PM.png>)

---

## Features

- Browse top headlines by category (Technology, Business, Health, Sports, Entertainment)
- **User authentication (JWT-based login/signup)**
- **User profile management with password change functionality**
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
    npm start
    ```
    or
    ```bash
    npm run dev
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

## Deployment

The application is configured to use the deployed backend on Render:
- **Backend URL**: https://news-app-backend-sfkz.onrender.com
- **Frontend**: Can be deployed on Vercel, Netlify, or similar platforms

For local development, you can change the API endpoints back to `http://localhost:8000` in the frontend components.

---

## Coming Soon / TODO

- UI Improvements
- Mobile Optimisations
- Toast notifications for Save/Remove
- Dark mode toggle
- Analytics dashboard
- Saved news history with timestamps

---


