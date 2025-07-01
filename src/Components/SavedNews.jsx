import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import defaultNewsImage from '../assets/news.jpg';

const SavedNews = () => {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const savedArticles = JSON.parse(localStorage.getItem('savedNews') || '[]');
    setSaved(savedArticles);
  }, []);

  const handleRemove = (url) => {
    const updated = saved.filter(article => article.url !== url);
    setSaved(updated);
    localStorage.setItem('savedNews', JSON.stringify(updated));
  };

  // Custom NewsItem for SavedNews with Remove button beside Read More
  const SavedNewsItem = ({ news }) => (
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
        src={news.image ? news.image : defaultNewsImage}
        className="card-img-top"
        alt="news"
        style={{
          height: "180px",
          width: "100%",
          objectFit: "cover"
        }}
      />
      <div className="card-body d-flex flex-column justify-content-between" style={{height: "calc(100% - 180px)"}}>
        <h5 className="card-title" style={{fontSize: "1.1rem"}}>{news.title.slice(0, 60)}...</h5>
        <p className="card-text" style={{fontSize: "0.95rem"}}>
          {news.description
            ? news.description.slice(0, 90) + "..."
            : "Stay updated with the latest developments, key insights, and top stories from around the world."}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <a href={news.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Read more
          </a>
          <button
            className="btn btn-outline-danger ms-2"
            onClick={() => handleRemove(news.url)}
            title="Remove from saved"
          >
            Remove
          </button>
        </div>
        {news.category && (
          <span
            className="badge bg-secondary"
            style={{
              position: 'absolute',
              top: 18,
              left: 24,
              zIndex: 2,
              fontSize: '0.85rem'
            }}
          >
            {news.category}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-center mt-4">Saved News</h2>
      <div className="row justify-content-center">
        {saved.length === 0 && <p className="text-center">No saved news.</p>}
        {saved.map((news, index) => (
          <div className="col-12 col-sm-6 col-md-4 custom-col-lg-5 d-flex justify-content-center" key={index}>
            <SavedNewsItem news={news} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedNews;