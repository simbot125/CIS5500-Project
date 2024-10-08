import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import About from './components/About';
import Contact from './components/Contact';
import SongDetailPage from './components/SongDetailPage';
import ArtistsResultsPage from './components/ArtistsResultsPage';
import YearInReviewPage from './components/YearInReviewPage';
import PlaylistRecommendationPage from './components/PlaylistRecommendationPage';
import UserProfilePage from './components/UserProfilePage';
import FavoritesPage from './components/FavoritesPage';
import Register from './components/Register';
import SearchResultsPage from './components/SearchResultsPage'; // Import the SearchResultsPage

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/song/:songId" element={<SongDetailPage />} />
          <Route path="/artist/:artistName" element={<ArtistsResultsPage />} />
          <Route path="/year-in-review" element={<YearInReviewPage />} />
          <Route path="/playlist-recommendation" element={<PlaylistRecommendationPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchResultsPage />} /> {/* Add this route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
