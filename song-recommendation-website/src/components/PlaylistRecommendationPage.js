import React, { useState, useEffect } from 'react';
import Layout from './Layout'; // Make sure to import the Layout component

const PlaylistRecommendationPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [filters, setFilters] = useState({
    genre: '',
    popularity: '',
    danceability: '',
    tempo: ''
  });

  useEffect(() => {
    fetch('http://localhost:3001/playlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters)
    })
      .then(response => response.json())
      .then(data => setPlaylists(data))
      .catch(error => console.error('Error fetching playlists:', error));
  }, [filters]);

  return (
    <Layout>
      <div className="container my-5">
        <h2>Playlist Recommendations</h2>
        <form>
          <div className="form-group">
            <label>Genre</label>
            <select className="form-control" onChange={e => setFilters({ ...filters, genre: e.target.value })}>
              <option value="">Select Genre</option>
              <option value="pop">Pop</option>
              <option value="rock">Rock</option>
              <option value="hip-hop">Hip-hop</option>
              <option value="country">Country</option>
            </select>
          </div>
          <div className="form-group">
            <label>Popularity</label>
            <input
              type="number"
              className="form-control"
              onChange={e => setFilters({ ...filters, popularity: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Danceability</label>
            <input
              type="number"
              className="form-control"
              onChange={e => setFilters({ ...filters, danceability: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Tempo</label>
            <input
              type="number"
              className="form-control"
              onChange={e => setFilters({ ...filters, tempo: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Get Recommendations</button>
        </form>
        <div className="row mt-5">
          {playlists.map((playlist, index) => (
            <div className="col-md-4" key={index}>
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{playlist.name}</h5>
                  <p className="card-text">Genre: {playlist.genre}</p>
                  <p className="card-text">Popularity: {playlist.popularity}</p>
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
