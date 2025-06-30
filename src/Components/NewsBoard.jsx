import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';

const NewsBoard = ({category}) => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(()=> {
        let url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${import.meta.env.VITE_API_KEY}`;
        if (search) {
          url = `https://gnews.io/api/v4/search?q=${search}&lang=en&country=us&max=10&apikey=${import.meta.env.VITE_API_KEY}`;
        }
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (!data.articles) {
              setError(data.message || "Failed to fetch news. Try reloading the page.");
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
    }, [category, search]);

    return (
      <div>
        <div style={{ height: '24px' }} />
        <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
        <div className="d-flex justify-content-center mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search news..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {error && <p className="text-center text-danger">{error}</p>}
        <div className="row justify-content-center">
          {articles && articles.map((news, index) => (
            <div className="col-12 col-sm-6 col-md-4 custom-col-lg-5 d-flex justify-content-center" key={index}>
              <NewsItem
                title={news.title}
                description={news.description}
                src={news.image}
                url={news.url}
              />
            </div>
          ))}
        </div>
      </div>
    );
};

export default NewsBoard