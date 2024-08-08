import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginRegisterPage from './LoginRegisterPage';
import UserProfilePage from './UserProfilePage';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    navigate('/');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Songify Logo" style={{ height: '40px' }} className="me-2" />
            Songify
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user-profile">{user.display_name}</Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link btn btn-link" to="/login-register">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <header className="bg-dark text-white text-center py-5">
        <h1 className="display-4">Welcome to Songify!</h1>
        <p className="lead">Your one-stop destination for music recommendations</p>
      </header>

      <section className="hero-section bg-light text-dark text-center py-5">
        <div className="container">
          <h2 className="display-5">Discover New Music</h2>
          <p className="lead">
            Explore trending tracks and get personalized song recommendations based on your taste.
          </p>
          <input type="text" className="form-control" placeholder="Search for a song or artist" />
          <button className="btn btn-primary btn-lg mt-4">Search</button>
        </div>
      </section>

      <section className="additional-features py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-stretch">
              <div className="feature-box bg-white p-4 rounded shadow-sm">
                <h2 className="display-5">Year in Review</h2>
                <p className="lead">
                  Explore the musical profile of a selected year, including the most popular artists and songs.
                </p>
                <Link to="/year-in-review" className="btn btn-primary btn-lg mt-4">Explore Year in Review</Link>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-stretch">
              <div className="feature-box bg-white p-4 rounded shadow-sm">
                <h2 className="display-5">Playlist Recommendations</h2>
                <p className="lead">
                  Get personalized playlist recommendations based on your favorite genres and moods.
                </p>
                <Link to="/playlist-recommendations" className="btn btn-primary btn-lg mt-4">Get Playlist Recommendations</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-md-left text-center mb-3 mb-md-0">
              <p>&copy; 2024 Songify. All Rights Reserved.</p>
            </div>
            <div className="col-md-6 text-md-right text-center">
              <Link to="/about" className="text-white mx-2">About</Link>
              <Link to="/contact" className="text-white mx-2">Contact</Link>
              <div className="social-icons d-inline-block">
                <a href="#" className="text-white mx-2"><i className="fab fa-facebook"></i></a>
                <a href="#" className="text-white mx-2"><i className="fab fa-twitter"></i></a>
                <a href="#" className="text-white mx-2"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Routes>
        <Route path="/login-register" element={<LoginRegisterPage onLogin={handleLogin} />} />
        <Route path="/user-profile" element={<UserProfilePage userId={user?.user_id} />} />
      </Routes>
    </div>
  );
};

export default HomePage;
