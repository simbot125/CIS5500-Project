import React, { useState, useEffect } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserProfilePage from './UserProfilePage';
import GoogleLoginButton from './GoogleLoginButton';
import Register from './Register'; // Import the Register component

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('user');
  });
  const [userName, setUserName] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser).username : '';
  });

  const navigate = useNavigate();

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUserName(user.name);
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleRegisterSuccess = (user) => {
    setIsLoggedIn(true);
    setUserName(user.email);
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/');
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

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
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/user-profile">{userName}</Link>
                  </li>
                  <li className="nav-item">
                    <GoogleLoginButton onLoginSuccess={handleLogin} onLogout={handleLogout} />
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <GoogleLoginButton onLoginSuccess={handleLogin} onLogout={handleLogout} />
                  </li>
                </>
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

      <section className="additional-features py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-stretch mb-4">
              <div className="card w-100">
                <div className="card-body d-flex flex-column">
                  <h2 className="card-title display-5">Year in Review</h2>
                  <p className="card-text lead flex-grow-1">
                    Explore the musical profile of a selected year, including the most popular artists and songs.
                  </p>
                  <Link to="/year-in-review" className="btn btn-primary mt-auto align-self-start">Explore Year in Review</Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-stretch mb-4">
              <div className="card w-100">
                <div className="card-body d-flex flex-column">
                  <h2 className="card-title display-5">Playlist Recommendations</h2>
                  <p className="card-text lead flex-grow-1">
                    Get personalized playlist recommendations based on your favorite genres and moods.
                  </p>
                  <Link to="/playlist-recommendations" className="btn btn-primary mt-auto align-self-start">Get Playlist Recommendations</Link>
                </div>
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
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/register" element={<Register onRegisterSuccess={handleRegisterSuccess} />} />
      </Routes>
    </div>
  );
};

export default HomePage;
