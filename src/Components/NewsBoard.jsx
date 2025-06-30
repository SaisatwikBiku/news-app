import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';

const NewsBoard = ({category}) => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=> {
        let url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${import.meta.env.VITE_API_KEY}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (!data.articles) {
              setError(data.message || "Failed to fetch news");
              setArticles([]);
            } else {
              setArticles(data.articles || []);
              setError(null);
            }
          })
          .catch(() => {
            setError("Network error");
            setArticles([]);
          });
    }, [category])

    return (
      <div>
        <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
        {error && <p className="text-center text-danger">{error}</p>}
        {articles && articles.map((news, index) => (
          <NewsItem key={index} title={news.title} description={news.description} src={news.image} url={news.url} />
        ))}
      </div>
    );
};

export default NewsBoard