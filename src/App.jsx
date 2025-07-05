import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NewsBoard from "./Components/NewsBoard";
import SavedNews from "./Components/SavedNews";
import Login from "./Components/Login";     
import Signup from "./Components/Signup"; 
import ProtectedRoute from "./Components/ProtectedRoute";   
import Logout from "./Components/Logout";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <Router>
       <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">NewsApp</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Home</Link>

          {isLoggedIn && (
            <Link className="nav-link" to="/saved">
              Saved News
            </Link>
          )}

          {!isLoggedIn && (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/signup">Signup</Link>
            </>
          )}

          {isLoggedIn && (
            <Link className="nav-link" to="/logout">Logout</Link>
          )}
        </div>
      </nav>

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
    </Router>
  );
}

export default App;
