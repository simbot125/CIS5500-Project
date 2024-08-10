import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => !!localStorage.getItem('user'));
  const [userName, setUserName] = React.useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser).username || JSON.parse(storedUser).name : '';
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('user');
    navigate('/');
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.username || user.name);
    }
  }, [isLoggedIn]);

  return (
    <div className="d-flex flex-column min-vh-100">
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
                    <button className="btn btn-link nav-link" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Login/Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <main className="flex-grow-1">
        {children}
      </main>
      <footer className="bg-dark text-white text-center py-4 mt-auto">
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
    </div>
  );
};

export default Layout;
