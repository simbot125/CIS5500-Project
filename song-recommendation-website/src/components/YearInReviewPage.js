import React, { useState, useEffect } from 'react';

const YearInReviewPage = () => {
  const [year, setYear] = useState('');
  const [yearData, setYearData] = useState(null);

  useEffect(() => {
    if (year) {
      fetch(`http://localhost:3001/year/${year}`)
        .then(response => response.json())
        .then(data => setYearData(data))
        .catch(error => console.error('Error fetching year data:', error));
    }
  }, [year]);

  return (
    <div className="container my-5">
      <h2>Year in Review</h2>
      <input
        type="number"
        className="form-control"
        placeholder="Enter a year"
        value={year}
        onChange={e => setYear(e.target.value)}
      />
      {yearData && (
        <>
          <h3>Year: {year}</h3>
          <p>Most Popular Song: {yearData.most_popular_song}</p>
          <p>Most Popular Artist: {yearData.most_popular_artist}</p>
          <p>Valence: {yearData.valence}</p>
          <p>Tempo: {yearData.tempo}</p>
          <p>Key: {yearData.key}</p>
          <p>Danceability: {yearData.danceability}</p>
        </>
      )}
    </div>
  );
};

export default YearInReviewPage;
