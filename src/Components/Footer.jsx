import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-auto">
      <div className="container text-center">
        <small>
          Powered by <a href="https://gnews.io/" target="_blank" rel="noopener noreferrer" className="text-info">GNews API</a>
          {" | "}
          Developed by <a href="https://github.com/SaisatwikBiku" target="_blank" rel="noopener noreferrer" className="text-info">Sai Satwik Bikumandla</a>
        </small>
      </div>
    </footer>
  );
}