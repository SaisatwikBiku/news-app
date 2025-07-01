import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NewsBoard from "./Components/NewsBoard";
import SavedNews from "./Components/SavedNews";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">
          NewsApp
        </Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/saved">
            Saved News
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<NewsBoard category="general" />} />
        <Route path="/saved" element={<SavedNews />} />
      </Routes>
    </Router>
  );
}

export default App;