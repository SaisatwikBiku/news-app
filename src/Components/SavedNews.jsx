import React, { useEffect, useState } from 'react';
import defaultNewsImage from '../assets/news.jpg';
import { useNavigate } from 'react-router-dom';


const SavedNewsItem = ({ news, onRemove }) => (
  <div className="card shadow-sm border-0 bg-grey mb-4"
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
        src={news.image ? news.image : defaultNewsImage}
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
    <div className="card-body d-flex flex-column justify-content-between" style={{ minHeight: 200 }}>
      <h5 className="card-title mb-2" style={{ fontSize: "1.08rem", fontWeight: 600 }}>
        {news.title?.length > 70 ? news.title.slice(0, 67) + "..." : news.title}
      </h5>
      <p className="card-text text-muted mb-3" style={{ fontSize: "0.97rem" }}>
        {news.description
          ? news.description.length > 100
            ? news.description.slice(0, 97) + "..."
            : news.description
          : "Stay updated with the latest developments, key insights, and top stories from around the world."}
      </p>
      <div className="d-flex justify-content-between align-items-center mt-auto gap-2">
        <a
          href={news.url}
          className="btn btn-sm btn-primary px-3"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontWeight: 500 }}
        >
          <i className="bi bi-box-arrow-up-right me-1"></i>Read More
        </a>
        <button
          className="btn btn-sm btn-outline-danger px-3"
          onClick={() => onRemove(news.url)}
          title="Remove from saved"
          style={{ fontWeight: 500 }}
        >
          <i className="bi bi-trash me-1"></i>Remove
        </button>
      </div>
      {news.category && (
        <span
          className="badge bg-secondary"
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            zIndex: 2,
            fontSize: '0.85rem',
            letterSpacing: '0.5px'
          }}
        >
          {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
        </span>
      )}
    </div>
  </div>
);

const SavedNews = () => {
  const [saved, setSaved] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaved = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("https://news-app-backend-sfkz.onrender.com/api/news/saved", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const normalized = data.map(item => ({
          ...item,
          image: item.urlToImage,
        }));
        setSaved(normalized);
      } catch (err) {
        setError("Failed to fetch saved news.");
        console.error("Failed to fetch saved news", err);
      }
    };

    fetchSaved();
  }, []);

  const handleRemove = async (url) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("https://news-app-backend-sfkz.onrender.com/api/news/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url }),
      });

      if (res.ok) {
        const updated = saved.filter(article => article.url !== url);
        setSaved(updated);
      } else {
        const err = await res.json();
        alert(err.error || "Remove failed");
      }
    } catch (err) {
      console.error("Remove failed:", err);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4 gap-3">
        <h2 className="mb-0 text-center text-md-start">
          <i className="bi bi-bookmark-heart-fill text-success me-2"></i>
          Saved <span className="badge bg-primary">News</span>
        </h2>
        <div>
          <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
            <i className="bi bi-arrow-left me-2"></i>Back to News
          </button>
        </div>
      </div>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      {saved.length === 0 ? (
        <div className="text-center text-muted py-5">
          <i className="bi bi-inbox" style={{ fontSize: "2.5rem" }}></i>
          <div>No saved news yet.</div>
        </div>
      ) : (
        <div className="row g-4 justify-content-center">
          {saved.map((news, index) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex" key={index}>
              <SavedNewsItem news={news} onRemove={handleRemove} />
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-4">
        <small className="text-muted">Powered by <a href="https://gnews.io/" target="_blank" rel="noopener noreferrer">GNews API</a></small>
      </div>
      <div className="text-center mt-2">
        <small className="text-muted">
          Developed by <a href="https://github.com/SaisatwikBiku" target="_blank" rel="noopener noreferrer">Sai Satwik Bikumandla</a>
        </small>
      </div>
    </div>
  );
};

export default SavedNews;