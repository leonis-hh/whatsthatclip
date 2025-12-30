import { useState } from 'react';
import './App.css';

function App() {
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch movie data from TMDB
  async function fetchMovieInfo(movieName) {
    try {
      const response = await fetch(
        `https://api.tmdb.org/3/search/movie?api_key=0101271d476b11bf602d0d6db1343aa7&query=${encodeURIComponent(movieName)}`
      );
      const data = await response.json();
      return data.results[0]; // Return first result
    } catch (err) {
      console.error('Error fetching movie info:', err);
      return null;
    }
  }

  const handleSearch = async () => {
    if (!tiktokUrl.trim()) {
      alert('Please paste a TikTok link!');
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    // Fetch movie data
    const searchTerm = tiktokUrl.trim();
    const data = await fetchMovieInfo(searchTerm);

    // Update result state
    if (data) {
      setResult({
        title: data.title,
        type: 'Movie',
        year: data.release_date.split('-')[0], // Extract year from "2008-07-16"
        overview: data.overview,
        poster: data.poster_path
      });
      setError(null);
    } else {
      setError('No results found. Try a different search.');
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>WhatsThatClip</h1>
        <p>Find any movie or TV show from TikTok clips</p>
        
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Paste TikTok link here..."
            className="tiktok-input"
            value={tiktokUrl}
            onChange={(e) => setTiktokUrl(e.target.value)}
          />
          <button 
            className="search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Find Movie/Show'}
          </button>

          {result && (
            <div className="result">
              <div className="result-content">
                {result.poster && (
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${result.poster}`}
                    alt={result.title}
                    className="poster"
                  />
                )}
                
                <div className="result-info">
                  <h2>{result.title}</h2>
                  <p className="meta">{result.type} • {result.year}</p>
                  <p className="overview">{result.overview}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;