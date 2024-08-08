import React, { useState } from 'react';
import GoogleLoginButton from './GoogleLoginButton';
import { useNavigate } from 'react-router-dom';

const LoginRegisterPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Implement standard login logic here
    if (email === 'user@example.com' && password === 'password') {
      onLogin({ name: 'Standard User' });
      navigate('/');
    } else {
      alert('Invalid email or password');
    }
  };

  const handleRegister = () => {
    // Implement registration logic here
    if (email && password && username) {
      // Call API to register user
      onLogin({ name: 'New User' });
      navigate('/');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log('Google login successful:', response.profileObj);
    onLogin({ name: response.profileObj.name });
    navigate('/');
  };

  const handleGoogleLoginFailure = (response) => {
    console.error('Google login failed:', response);
    alert('Google login failed');
  };

  return (
    <div className="container my-5">
      <h2>Login/Register</h2>
      <div className="row">
        <div className="col-md-6">
          <h3>Login</h3>
          <form>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
          <div className="mt-3">
            <GoogleLoginButton onLogin={handleGoogleLoginSuccess} onLoginFailure={handleGoogleLoginFailure} />
          </div>
        </div>
        <div className="col-md-6">
          <h3>Register</h3>
          <form>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Display Name</label>
              <input
                type="text"
                className="form-control"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                className="form-control"
                value={bio}
                onChange={e => setBio(e.target.value)}
              ></textarea>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleRegister}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
