import React, { useState, useEffect } from 'react';
import Layout from './Layout'; 

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
    <Layout>
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
            <h3 className="mt-4">Year: {year}</h3>
            <p><strong>Most Popular Song:</strong> {yearData.most_popular_song}</p>
            <p><strong>Most Popular Artist:</strong> {yearData.most_popular_artist}</p>
            <p><strong>Valence:</strong> {yearData.valence}</p>
            <p><strong>Tempo:</strong> {yearData.tempo}</p>
            <p><strong>Key:</strong> {yearData.key}</p>
            <p><strong>Danceability:</strong> {yearData.danceability}</p>
          </>
        )}
      </div>
    </Layout>
  );
};

export default YearInReviewPage;
