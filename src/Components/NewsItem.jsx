import image from '../assets/news.jpg';

const NewsItem = ({title, description, src, url, onSave, isSaved}) => {
  return (
    <div
      className="card bg-dark text-light mb-3 mx-3 my-3"
      style={{
        width: "325px",
        height: "420px",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
      }}
    >
      <img
        src={src ? src : image}
        className="card-img-top"
        alt="news"
        style={{
          height: "180px",
          width: "100%",
          objectFit: "cover"
        }}
      />
      <div className="card-body d-flex flex-column justify-content-between" style={{height: "calc(100% - 180px)"}}>
        <h5 className="card-title" style={{fontSize: "1.1rem"}}>{title.slice(0, 60)}...</h5>
        <p className="card-text" style={{fontSize: "0.95rem"}}>
          {description
            ? description.slice(0, 90) + "..."
            : "Stay updated with the latest developments, key insights, and top stories from around the world."}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <a href={url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Read more
          </a>
          {onSave && (
            <button
              className={`btn ms-2 ${isSaved ? 'btn-success' : 'btn-outline-warning'}`}
              onClick={onSave}
              disabled={isSaved}
            >
              {isSaved ? 'Saved!' : 'Save'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsItem;