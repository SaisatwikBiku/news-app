import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';
import { useNavigate } from 'react-router-dom';

const categories = [
  { value: 'general', label: 'General' },
  { value: 'world', label: 'World' },
  { value: 'nation', label: 'Nation' },
  { value: 'business', label: 'Business' },
  { value: 'technology', label: 'Technology' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'sports', label: 'Sports' },
  { value: 'science', label: 'Science' },
  { value: 'health', label: 'Health' }
];

const NewsBoard = ({ category: initialCategory }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [category, setCategory] = useState(initialCategory || 'general');
  const navigate = useNavigate();

  useEffect(() => {
    let url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${import.meta.env.VITE_API_KEY}`;
    if (search) {
      url = `https://gnews.io/api/v4/search?q=${search}&lang=en&country=us&max=10&category=${category}&apikey=${import.meta.env.VITE_API_KEY}`;
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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  // Save handler
  const handleSave = (article) => {
    // Get current saved articles
    const saved = JSON.parse(localStorage.getItem('savedNews') || '[]');
    // Avoid duplicates (by url)
    if (!saved.some(item => item.url === article.url)) {
      saved.push(article);
      localStorage.setItem('savedNews', JSON.stringify(saved));
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSearch('');
    setSearchInput('');
  };

  return (
    <div>
      <div style={{ height: '24px' }} />
      <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
      <div className="d-flex justify-content-center mb-3">
        <select
          className="form-select w-auto me-2"
          value={category}
          onChange={handleCategoryChange}
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder="Search news..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <button className="btn btn-primary ms-2" type="submit">Search</button>
        </form>
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
              onSave={() => handleSave(news)}
            />
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-success" onClick={() => navigate('/saved')}>
          View Saved News
        </button>
      </div>
    </div>
  );
};

export default NewsBoard;