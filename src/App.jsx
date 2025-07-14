import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import NewsBoard from "./Components/NewsBoard";
import SavedNews from "./Components/SavedNews";
import Login from "./Components/Login";     
import Signup from "./Components/Signup"; 
import ProtectedRoute from "./Components/ProtectedRoute";   
import Logout from "./Components/Logout";
import Profile from "./Components/Profile";
import logo from "./assets/news_app_logo.png";
import Footer from "./Components/Footer"; 

function Navbar({ isLoggedIn }) {
  const location = useLocation();
  const username = isLoggedIn ? localStorage.getItem("username") : null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="News App Logo"
            style={{ height: 100, width: 100, objectFit: "contain", marginRight: 8 }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {isLoggedIn && username && (
            <span className="navbar-text ms-lg-3 mt-2 mt-lg-0 text-light fw-semibold">
              👋 Hello, {username}!
            </span>
          )}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link${location.pathname === "/" ? " active fw-bold text-primary" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  className={`nav-link${location.pathname === "/saved" ? " active fw-bold text-primary" : ""}`}
                  to="/saved"
                >
                  Saved News
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  className={`nav-link${location.pathname === "/profile" ? " active fw-bold text-primary" : ""}`}
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link${location.pathname === "/login" ? " active fw-bold text-primary" : ""}`}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link${location.pathname === "/signup" ? " active fw-bold text-primary" : ""}`}
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <Link
                  className={`nav-link${location.pathname === "/logout" ? " active fw-bold text-primary" : ""}`}
                  to="/logout"
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function App() {
  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar isLoggedIn={isLoggedIn} />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <NewsBoard category="general" />
              </ProtectedRoute>
            } />
            <Route path="/saved" element={
              <ProtectedRoute>
                <SavedNews />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
        <Footer /> 
      </div>
    </Router>
  );
}

export default App;
