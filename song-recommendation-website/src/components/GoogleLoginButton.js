import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

const GoogleLoginButton = ({ onLoginSuccess, onLogout }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const clientId = 'YOUR_CLIENT_ID_HERE'; // Replace with your actual client ID

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: 'profile email',
        plugin_name: "Songify",
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          const profile = authInstance.currentUser.get().getBasicProfile();
          const userData = {
            id: profile.getId(),
            name: profile.getName(),
            imageUrl: profile.getImageUrl(),
            email: profile.getEmail()
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          onLoginSuccess(userData);
        }
      }).catch(error => {
        console.error("Failed to initialize Google API client:", error);
      });
    }
    gapi.load('client:auth2', start);
  }, [clientId, onLoginSuccess]);

  const onSuccess = (res) => {
    const profile = res.getBasicProfile();
    const userData = {
      id: profile.getId(),
      name: profile.getName(),
      imageUrl: profile.getImageUrl(),
      email: profile.getEmail()
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    onLoginSuccess(userData);
  };

  const onFailure = (err) => {
    console.error('Login failed:', err);
    alert('Failed to login. Please try again.');
  };

  const handleLogin = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance
      .signIn()
      .then(onSuccess)
      .catch(onFailure);
  };

  const handleLogout = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signOut().then(() => {
      setUser(null);
      localStorage.removeItem('user');
      onLogout(); // Notify parent component about the logout
    });
  };

  return (
    <div className="d-flex align-items-center">
      {user ? (
        <button className="btn btn-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="btn btn-primary btn-sm" onClick={handleLogin}>
          Login with Google
        </button>
      )}
    </div>
  );
};

export default GoogleLoginButton;
