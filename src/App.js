import { useState } from 'react';
import './App.css';

function App() {
  const [tiktokUrl, setTiktokUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);


  // Function to fetch movie data from TMDB
  async function fetchMovieInfo(movieName) {
    try {
      const response = await fetch(
        `https://api.tmdb.org/3/search/movie?api_key=0101271d476b11bf602d0d6db1343aa7&query=${encodeURIComponent(movieName)}`
      );
      const data = await response.json();
      return data.results[0];
    } catch (err) {
      console.error('Error fetching movie info:', err);
      return null;
    }
  }

  async function fetchTVInfo(tvName) {
    try {
      const response = await fetch(
        `https://api.tmdb.org/3/search/tv?api_key=0101271d476b11bf602d0d6db1343aa7&query=${encodeURIComponent(tvName)}`
      );
      const data = await response.json();
      return data.results[0];
    } catch (err) {
      console.error('Error fetching TV Show info:', err);
      return null;
    }
  }

  // Helper function to set movie result
  function setMovieResult(movieData) {
    setResult({
      title: movieData.title,
      type: 'Movie',
      year: movieData.release_date.split('-')[0],
      overview: movieData.overview,
      poster: movieData.poster_path
    });
    setError(null);
  }

  // Helper function to set TV result
  function setTVResult(tvData) {
    setResult({
      title: tvData.name,
      type: 'TV Show',
      year: tvData.first_air_date.split('-')[0],
      overview: tvData.overview,
      poster: tvData.poster_path
    });
    setError(null);
  }

  const handleSearch = async () => {
    if (!tiktokUrl.trim()) {
      alert('Please paste a TikTok link!');
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    const searchTerm = tiktokUrl.trim();
    const movieData = await fetchMovieInfo(searchTerm);
    const tvData = await fetchTVInfo(searchTerm);

    if (!movieData && !tvData) {
      setError('No results found. Try a different search.');
    } else if (movieData && !tvData) {
      setMovieResult(movieData);
    } else if (tvData && !movieData) {
      setTVResult(tvData);
    } else {
      // Both found - compare popularity
      if (movieData.popularity > tvData.popularity) {
        setMovieResult(movieData);
      } else {
        setTVResult(tvData);
      }
    }

    setLoading(false);
  };

  const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    setUploadedFile(file);
    console.log('File selected:', file.name);
  }
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
            {loading && <span className="spinner"></span>}
            {loading ? 'Searching...' : 'Find Movie/Show'}
          </button>
          <div className="divider">
  <span>OR</span>
</div>

<div className="upload-area">
  <input
    type="file"
    id="file-upload"
    accept="video/*"
    onChange={handleFileUpload}
    style={{ display: 'none' }}
  />
  <label htmlFor="file-upload" className="upload-label">
    📁 Upload a video file
  </label>
  {uploadedFile && (
    <p className="file-name">Selected: {uploadedFile.name}</p>
  )}
</div>

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