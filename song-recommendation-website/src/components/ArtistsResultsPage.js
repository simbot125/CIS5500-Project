import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ArtistsResultsPage = () => {
  const { artistName } = useParams();
  const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/artists/${artistName}`)
      .then(response => response.json())
      .then(data => setArtistData(data))
      .catch(error => console.error('Error fetching artist data:', error));
  }, [artistName]);

  return (
    <div className="container my-5">
      {artistData && (
        <>
          <h2>{artistData.name}</h2>
          <p>Songs on Billboard: {artistData.songs_on_billboard}</p>
          <p>Valence: {artistData.valence}</p>
          <p>Tempo: {artistData.tempo}</p>
          <p>Key: {artistData.key}</p>
          <p>Danceability: {artistData.danceability}</p>
          <p>Popularity Score: {artistData.popularity_score}</p>
        </>
      )}
    </div>
  );
};

export default ArtistsResultsPage;
