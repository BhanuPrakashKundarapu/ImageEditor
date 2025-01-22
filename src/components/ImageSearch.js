import React, { useState } from 'react';
import axios from 'axios';
import "./ImageStyle.css"
const PIXABAY_API_KEY = ''; // You'll need to add your Pixabay API key
const API_URL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}`;

function ImageSearch({ onImageSelect }) {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchImages = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {      
      // const response = await axios.get(`${API_URL}&q=${encodeURIComponent(query)}`);
      const response=await axios.get(`https://pixabay.com/api/?key=48380942-8b60dd55ff92d5a00341f000b&q=${query}&image_type=photo`)
      setImages(response.data.hits);
    } catch (err) {
      setError('Failed to fetch images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-search">
      <form onSubmit={searchImages} className='form-search'>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="image-grid">
          {images.map((image) => (
            <div key={image.id} className="image-item">
              <img src={image.webformatURL} alt={image.tags} />
              <button
                onClick={() => onImageSelect(image.webformatURL)}
                className="edit-button"
              >
                Add Captions
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageSearch;