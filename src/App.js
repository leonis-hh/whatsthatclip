import './App.css';

function App() {
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
          />
          <button className="search-button">
            Find Movie/Show
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
