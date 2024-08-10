import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onLoginSuccess, onRegisterSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(true); // Toggle between login and register
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful!');
        setError(null); // Clear error
        onRegisterSuccess(data.user);
        navigate('/'); // Redirect to home after successful registration
      } else {
        setError(data.message || 'Registration failed');
        setSuccess(null); // Clear success
      }
    } catch (error) {
      console.error('Registration error:', error); // Log the error to the console
      if (error instanceof Error) {
        console.error('Registration error message:', error.message);
      }
      setError(`An error occurred during registration: ${error.message || 'Unknown error'}`);
      setSuccess(null); // Clear success
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Login successful!');
        setError(null); // Clear error
        onLoginSuccess(data.user);
        navigate('/'); // Redirect to home after successful login
      } else {
        setError(data.message || 'Login failed');
        setSuccess(null); // Clear success
      }
    } catch (error) {
      console.error('Login error:', error); // Log the error to the console
      if (error instanceof Error) {
        console.error('Login error message:', error.message);
      }
      setError(`An error occurred during login: ${error.message || 'Unknown error'}`);
      setSuccess(null); // Clear success
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '500px' }}>
        <div className="card-body">
          <h2 className="text-center">{isRegistering ? 'Register' : 'Login'}</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                {isRegistering ? 'Register' : 'Login'}
              </button>
            </div>
            <div className="text-center mt-3">
              <button type="button" className="btn btn-link" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
              </button>
              <button type="button" className="btn btn-link" onClick={() => navigate('/')}>
                Home
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
