import { useState } from 'react';
import './App.css';

function App() {
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    // Don't search if input is empty
    if (!tiktokUrl.trim()) {
      alert('Please paste a TikTok link!');
      return;
    }

    // Show loading state
    setLoading(true);
    setResult(null);

    // Simulate searching (we'll replace this with real API calls later)
    setTimeout(() => {
      setLoading(false);
      setResult({
        title: 'The Dark Knight',
        type: 'Movie',
        year: 2008
      });
    }, 2000); // Wait 2 seconds to simulate API call
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

          {/* Show results when we have them */}
          {result && (
            <div className="result">
              <h2>{result.title}</h2>
              <p>{result.type} • {result.year}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
