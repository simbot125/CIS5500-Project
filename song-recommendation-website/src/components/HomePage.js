// src/HomePage.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleLoginButton from './GoogleLoginButton';

const HomePage = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">Songify</a>
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <header className="bg-dark text-white text-center py-5">
        <h1 className="display-4">Welcome to Songify!</h1>
        <p className="lead">Your one-stop destination for music recommendations</p>
      </header>

      {/* Hero Section */}
      <section className="hero-section bg-light text-dark text-center py-5">
        <div className="container">
          <h2 className="display-5">Discover New Music</h2>
          <p className="lead">
            Explore trending tracks and get personalized song recommendations based on your taste.
          </p>
          <button className="btn btn-primary btn-lg mt-4">Get Started</button>
        </div>
      </section>

      {/* Authentication Section */}
      <GoogleLoginButton />

      {/* Featured Songs Section */}
      <section className="featured-songs py-5">
        <div className="container">
          <h3 className="text-center mb-4">Featured Songs</h3>
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Easy On Me</h5>
                  <p className="card-text">Artist: Adele</p>
                  <p className="card-text">Rank: 1</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Stay</h5>
                  <p className="card-text">Artist: The Kid LAROI & Justin Bieber</p>
                  <p className="card-text">Rank: 2</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Industry Baby</h5>
                  <p className="card-text">Artist: Lil Nas X & Jack Harlow</p>
                  <p className="card-text">Rank: 3</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <p>&copy; 2024 Songify. All Rights Reserved.</p>
          <div className="social-icons">
            <a href="#" className="text-white mx-2"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-white mx-2"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-white mx-2"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
