import defaultNewsImage from '../assets/news.jpg';

export default function NewsItem({ title, description, src, url, onSave, isSaved }) {
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
        </div>
      </div>
    </div>
  );
}