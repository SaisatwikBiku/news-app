import React, { useEffect, useState } from "react";
import defaultNewsImage from '../assets/news.jpg';

export default function Inbox() {
  const [shared, setShared] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("https://news-app-backend-sfkz.onrender.com/api/news/inbox", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setShared(data);
        else setError(data.error || "Failed to fetch inbox.");
      })
      .catch(() => setError("Network error"));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center">Inbox</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {shared.length === 0 ? (
        <div className="text-center text-muted py-5">
          <i className="bi bi-inbox" style={{ fontSize: "2.5rem" }}></i>
          <div>No shared news yet.</div>
        </div>
      ) : (
        <div className="row g-4 justify-content-center">
          {shared.map((news, idx) => (
            <div
              className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center"
              key={idx}
            >
              <div
                className="card shadow-sm border-0 bg-white mb-4"
                style={{
                  width: "100%",
                  maxWidth: 340,
                  minHeight: 420,
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  transition: "box-shadow 0.2s",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div style={{ height: 180, overflow: "hidden" }}>
                  <img
                    src={news.urlToImage ? news.urlToImage : defaultNewsImage}
                    className="card-img-top"
                    alt="news"
                    style={{
                      height: "180px",
                      width: "100%",
                      objectFit: "cover",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                    }}
                  />
                </div>
                <div className="card-body d-flex flex-column justify-content-between" style={{ minHeight: 200, padding: "1rem" }}>
                  <h5
                    className="card-title mb-2"
                    style={{
                      fontSize: "1.08rem",
                      fontWeight: 600,
                      wordBreak: "break-word",
                      lineHeight: "1.25",
                    }}
                  >
                    {news.title?.length > 70 ? news.title.slice(0, 67) + "..." : news.title}
                  </h5>
                  <p
                    className="card-text text-muted mb-3"
                    style={{
                      fontSize: "0.97rem",
                      wordBreak: "break-word",
                      lineHeight: "1.35",
                    }}
                  >
                    {news.description
                      ? news.description.length > 100
                        ? news.description.slice(0, 97) + "..."
                        : news.description
                      : "Stay updated with the latest developments, key insights, and top stories from around the world."}
                  </p>
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-stretch gap-2 mt-auto">
                    <a
                      href={news.url}
                      className="btn btn-sm btn-primary px-3 flex-fill"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontWeight: 500, minWidth: 0 }}
                    >
                      <i className="bi bi-box-arrow-up-right me-1"></i>Read More
                    </a>
                  </div>
                  <div className="mt-2 text-muted" style={{ fontSize: "0.9rem" }}>
                    Shared by: {news.senderId?.username || "Unknown"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}