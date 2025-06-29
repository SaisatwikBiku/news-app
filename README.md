# News App

A simple news application that fetches and displays the latest news articles using React and the News API.

![alt text](<Screenshot 2025-06-29 at 6.36.53 PM.png>)

## Features

- Browse top headlines by category (Technology, Business, Health, Sports, Entertainment)
- Search for news by keyword
- Responsive design with Bootstrap
- Error handling for API/network issues

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/news-app.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Add your NewsAPI key to a `.env` file in the root directory:
    ```
    VITE_API_KEY=your_api_key_here
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```

## Technologies Used

- React
- Axios
- Bootstrap
- News API

## Project Structure

- `src/components/` – React components (Navbar, NewsBoard, NewsItem)
- `src/assets/` – Static assets (images, icons)
- `src/App.jsx` – Main app component
- `.env` – API key configuration
