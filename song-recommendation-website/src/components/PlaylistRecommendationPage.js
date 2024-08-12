import React, { useState } from 'react';
import Layout from './Layout';

const PlaylistRecommendationPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    popularity: '',
    popularityFilterType: 'minimum',
    danceability: '',
    danceabilityFilterType: 'minimum',
    tempo: '',
    tempoFilterType: 'minimum',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); 
    fetch('http://localhost:3001/playlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters),
    })
      .then((response) => response.json())
      .then((data) => setPlaylists(data))
      .catch((error) => console.error('Error fetching playlists:', error));
  };

  return (
    <Layout>
      <div className="container my-5">
        <h2>Playlist Recommendations</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Genre</label>
            <select
              name="genre"
              className="form-control"
              onChange={handleInputChange}
            >
              <option value="">Select Genre</option>
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="hip-hop">Hip-hop</option>
              <option value="country">Country</option>
            </select>
          </div>

          {/* Popularity Filter */}
          <div className="form-group">
            <label>Popularity</label>
            <input
              type="number"
              name="popularity"
              className="form-control"
              placeholder="Popularity"
              onChange={handleInputChange}
            />
            <div className="form-check">
              <input
                type="radio"
                name="popularityFilterType"
                value="minimum"
                className="form-check-input"
                checked={filters.popularityFilterType === 'minimum'}
                onChange={handleInputChange}
              />
              <label className="form-check-label">Minimum</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                name="popularityFilterType"
                value="exact"
                className="form-check-input"
                checked={filters.popularityFilterType === 'exact'}
                onChange={handleInputChange}
              />
              <label className="form-check-label">Exact</label>
            </div>
          </div>

          {/* Danceability Filter */}
          <div className="form-group">
            <label>Danceability</label>
            <input
              type="number"
              name="danceability"
              className="form-control"
              placeholder="Danceability"
              onChange={handleInputChange}
            />
            <div className="form-check">
              <input
                type="radio"
                name="danceabilityFilterType"
                value="minimum"
                className="form-check-input"
                checked={filters.danceabilityFilterType === 'minimum'}
                onChange={handleInputChange}
              />
              <label className="form-check-label">Minimum</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                name="danceabilityFilterType"
                value="exact"
                className="form-check-input"
                checked={filters.danceabilityFilterType === 'exact'}
                onChange={handleInputChange}
              />
              <label className="form-check-label">Exact</label>
            </div>
          </div>

          {/* Tempo Filter */}
          <div className="form-group">
            <label>Tempo</label>
            <input
              type="number"
              name="tempo"
              className="form-control"
              placeholder="Tempo"
              onChange={handleInputChange}
            />
            <div className="form-check">
              <input
                type="radio"
                name="tempoFilterType"
                value="minimum"
                className="form-check-input"
                checked={filters.tempoFilterType === 'minimum'}
                onChange={handleInputChange}
              />
              <label className="form-check-label">Minimum</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                name="tempoFilterType"
                value="exact"
                className="form-check-input"
                checked={filters.tempoFilterType === 'exact'}
                onChange={handleInputChange}
              />
              <label className="form-check-label">Exact</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Get Recommendations
          </button>
        </form>

        <div className="row mt-5">
          {playlists.map((playlist, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{playlist.track_name}</h5>
                  <p className="card-text">Genre: {playlist.playlist_genre}</p>
                  <p className="card-text">Popularity: {playlist.track_popularity}</p>
                  <p className="card-text">Danceability: {playlist.danceability}</p>
                  <p className="card-text">Tempo: {playlist.tempo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PlaylistRecommendationPage;
