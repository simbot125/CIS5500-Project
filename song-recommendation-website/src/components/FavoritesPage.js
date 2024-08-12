import React, { useState, useEffect } from 'react';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/favorites')
      .then(response => response.json())
      .then(data => setFavorites(data))
      .catch(error => console.error('Error fetching favorites:', error));
  }, []);

  const handleRemoveFavorite = (songId) => {
  };

  return (
    <div className="container my-5">
      <h2>Favorites</h2>
      <div className="row">
        {favorites.map(song => (
          <div className="col-md-4" key={song.id}>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{song.title}</h5>
                <p className="card-text">Artist: {song.artist}</p>
                <button onClick={() => handleRemoveFavorite(song.id)} className="btn btn-danger">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
