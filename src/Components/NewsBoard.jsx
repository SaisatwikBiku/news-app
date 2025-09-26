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
  const [savedUrls, setSavedUrls] = useState([]);

  const navigate = useNavigate();

  // Load saved URLs from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedNews') || '[]');
    setSavedUrls(saved.map(article => article.url));
  }, []);

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

        if (res.status === 403) {
          // Token is invalid/expired, clear it and redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          window.location.href = "/login";
          return;
        }

        if (res.ok) {
          const data = await res.json();
          setSavedUrls(data.map(item => item.url));
        }
      } catch (err) {
        console.error("Failed to fetch saved news", err);
      }
    };

    fetchSaved();
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        let url = `https://news-app-backend-sfkz.onrender.com/api/news/fetch?category=${category}&max=10`;
        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 403) {
          // Token is invalid/expired, clear it and redirect to login
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          window.location.href = "/login";
          return;
        }

        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later.");
        }

        if (response.status === 401) {
          throw new Error("Invalid API key. Please check your configuration.");
        }

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.articles) {
          setError(data.message || "Failed to fetch news. Try reloading the page.");
          setArticles([]);
        } else {
          setArticles(data.articles || []);
          setError(null);
        }
      } catch (error) {
        console.error("News fetch error:", error);
        setError(error.message || "Network error");
        setArticles([]);
      }
    };

    fetchNews();
  }, [category, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  // Save handler
  const handleSave = async (article) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to save news");

    try {
      const res = await fetch("https://news-app-backend-sfkz.onrender.com/api/news/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: article.title,
          description: article.description,
          url: article.url,
          urlToImage: article.image,
          publishedAt: article.publishedAt,
          source: article.source,
          category: category,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSavedUrls((prev) => [...prev, article.url]);
      } else {
        alert(data.error || "Save failed");
      }
    } catch (err) {
      console.error("Error saving:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  // Listen for removal from SavedNews (when user returns from /saved)
  useEffect(() => {
    const onFocus = () => {
      const saved = JSON.parse(localStorage.getItem('savedNews') || '[]');
      setSavedUrls(saved.map(article => article.url));
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSearch('');
    setSearchInput('');
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4 gap-3">
        <h2 className="mb-0 text-center text-md-start" style={{ fontSize: "1.7rem" }}>
          Latest <span className="badge bg-danger">News</span>
        </h2>
        <div className="d-flex flex-column flex-md-row align-items-center gap-2 w-100 w-md-auto">
          <select
            className="form-select w-100 w-md-auto"
            value={category}
            onChange={handleCategoryChange}
            style={{ minWidth: 140, maxWidth: 200 }}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
          <form className="d-flex w-100" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control"
              placeholder="Search news..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              style={{ minWidth: 0, flex: 1 }}
            />
            <button
              className="btn btn-primary ms-2 d-flex align-items-center justify-content-center"
              type="submit"
              style={{
                minWidth: 44,
                paddingLeft: 12,
                paddingRight: 12,
                height: 40,
              }}
              aria-label="Search"
            >
              <i className="bi bi-search"></i>
              <span className="d-none d-sm-inline ms-1">Search</span>
            </button>
          </form>
        </div>
      </div>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <div className="row g-4 justify-content-center">
        {articles && articles.length > 0 ? (
          articles.map((news, index) => (
            <div
              className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3 d-flex justify-content-center"
              key={index}
            >
              <NewsItem
                title={news.title}
                description={news.description}
                src={news.image}
                url={news.url}
                onSave={() => handleSave(news)}
                isSaved={savedUrls.includes(news.url)}
              />
            </div>
          ))
        ) : (
          !error && (
            <div className="col-12 text-center text-muted py-5">
              <i className="bi bi-newspaper" style={{ fontSize: "2.5rem" }}></i>
              <div>No news found for this category or search.</div>
            </div>
          )
        )}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-success px-4 py-2" onClick={() => navigate('/saved')}>
          <i className="bi bi-bookmark-heart-fill me-2"></i>View Saved News
        </button>
      </div>
    </div>
  );
};

export default NewsBoard;