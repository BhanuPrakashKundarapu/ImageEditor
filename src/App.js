import React, { useState, useEffect } from 'react';
import ImageSearch from './components/ImageSearch';
import ImageEditor from './components/ImageEditor';
import './App.css';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsEditing(true);
  };

  const handleBackToSearch = () => {
    setSelectedImage(null);
    setIsEditing(false);
  };

  return (
    <div className="app">
      <header>
        <h1>Vega</h1>
      </header>
      
      {!isEditing ? (
        <ImageSearch onImageSelect={handleImageSelect} />
      ) : (
        <div>
          <button className="back-button" onClick={handleBackToSearch}>
            ← Back to Search
          </button>
          <ImageEditor imageUrl={selectedImage} />
        </div>
      )}
    </div>
  );
}

export default App;