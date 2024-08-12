import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from './Layout';

const SearchResultsPage = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('q');
    
    if (query) {
      fetch(`http://localhost:3001/search?q=${query}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Search results:', data);
          setResults(data);
        })
        .catch((error) => console.error('Error fetching search results:', error));
    }
  }, [location.search]);

  return (
    <Layout>
      <div className="container my-5">
        <h2>Search Results for "{new URLSearchParams(location.search).get('q')}"</h2>
        {results.length > 0 ? (
          <div className="list-group">
            {results.map((item, index) => (
              <div key={index} className="list-group-item">
                <h5>{item.track_name}</h5>
                <p>{item.track_artist}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </Layout>
  );
};

export default SearchResultsPage;
