import { useState, useEffect } from "react";
import defaultNewsImage from '../assets/news.jpg';

export default function NewsItem({ title, description, src, url, onSave, isSaved }) {
  const [showShare, setShowShare] = useState(false);
  const [receiver, setReceiver] = useState("");
  const [shareMsg, setShareMsg] = useState("");
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    if (showShare) {
      fetch("https://news-app-backend-sfkz.onrender.com/api/auth/usernames")
        .then(res => res.json())
        .then(data => {
          // Exclude current user from the list
          const current = localStorage.getItem("username");
          setUsernames(data.filter(u => u !== current));
        });
    }
  }, [showShare]);

  const handleShare = async () => {
    setShareMsg("");
    const token = localStorage.getItem("token");
    if (!token) return setShareMsg("Please login to share news.");
    try {
      const res = await fetch("https://news-app-backend-sfkz.onrender.com/api/news/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverUsername: receiver,
          title,
          description,
          url,
          urlToImage: src,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setShareMsg("Shared successfully!");
        setReceiver("");
      } else {
        setShareMsg(data.error || "Share failed.");
      }
    } catch {
      setShareMsg("Share failed. Try again.");
    }
  };

  return (
    <div className="card shadow-sm border-0 bg-white mb-4"
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
          src={src ? src : defaultNewsImage}
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
          {title?.length > 70 ? title.slice(0, 67) + "..." : title}
        </h5>
        <p className="card-text text-muted mb-3" style={{ fontSize: "0.97rem" }}>
          {description
            ? description.length > 100
              ? description.slice(0, 97) + "..."
              : description
            : "Stay updated with the latest developments, key insights, and top stories from around the world."}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-auto gap-2">
          <a
            href={url}
            className="btn btn-sm btn-primary px-3"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 500 }}
          >
            <i className="bi bi-box-arrow-up-right me-1"></i>Read More
          </a>
          <button
            className={`btn btn-sm px-3 ${isSaved ? "btn-success" : "btn-outline-success"}`}
            onClick={onSave}
            title={isSaved ? "Saved" : "Save to bookmarks"}
            style={{ fontWeight: 500 }}
            disabled={isSaved}
          >
            <i className={`bi ${isSaved ? "bi-bookmark-check-fill" : "bi-bookmark-plus"} me-1`}></i>
            {isSaved ? "Saved" : "Save"}
          </button>
          <button
            className="btn btn-sm btn-outline-primary px-3"
            onClick={() => setShowShare(true)}
          >
            <i className="bi bi-share me-1"></i>Share
          </button>
        </div>
      </div>
      {/* Share Modal */}
      {showShare && (
        <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Share News</h5>
                <button type="button" className="btn-close" onClick={() => setShowShare(false)}></button>
              </div>
              <div className="modal-body">
                <select
                  className="form-select mb-2"
                  value={receiver}
                  onChange={e => setReceiver(e.target.value)}
                >
                  <option value="">Select recipient username</option>
                  {usernames.map(u => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
                {shareMsg && <div className="alert alert-info py-2">{shareMsg}</div>}
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleShare} disabled={!receiver}>Share</button>
                <button className="btn btn-secondary" onClick={() => setShowShare(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}