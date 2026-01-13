import { useState } from 'react';
import './App.css';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);


async function analyzeVideo(searchTerm) {
  try {
    const response = await fetch('http://localhost:8080/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        videoUrl: searchTerm,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error analyzing video:', err);
    return null;
  }
}


  const handleSearch = async () => {
    if (!videoUrl.trim()) {
      alert('Please paste a TikTok link!');
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);
    const data = await analyzeVideo(videoUrl.trim());

    if (!data || !data.title) {
      setError(data?.message || 'Something went wrong');
    } else {
      setResult(data);
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

  const handleClear = () => {
    setVideoUrl('');
    setResult(null);
    setError(null);
    setUploadedFile(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>WhatsThatClip</h1>
        <p>Find any movie or TV show from short clips</p>
        
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Paste TikTok or Instagram Reels link here..."
            className="tiktok-input"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
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
                {result.posterUrl && (
                  <img 
                    src={result.posterUrl}
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

          {(result || error) && (
            <button className="clear-button" onClick={handleClear}>
              Start New Search
            </button>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;