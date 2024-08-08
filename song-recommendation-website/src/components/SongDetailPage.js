import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SongDetailPage = () => {
  const { songId } = useParams();
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/songs/${songId}`)
      .then(response => response.json())
      .then(data => setSongData(data))
      .catch(error => console.error('Error fetching song data:', error));
  }, [songId]);

  return (
    <div className="container my-5">
      {songData && (
        <>
          <h2>{songData.title}</h2>
          <p>Artist: {songData.artist}</p>
          <p>Valence: {songData.valence}</p>
          <p>Tempo: {songData.tempo}</p>
          <p>Key: {songData.key}</p>
          <p>Danceability: {songData.danceability}</p>
          <h3>Billboard Data</h3>
          <p>Rank: {songData.rank}</p>
          <p>Weeks on Board: {songData.weeks_on_board}</p>
        </>
      )}
    </div>
  );
};

export default SongDetailPage;
