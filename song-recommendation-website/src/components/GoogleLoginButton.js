import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

const GoogleLoginButton = () => {
  const clientId = '594406784673-40nnncocga8lguoufi8agci7378cukft.apps.googleusercontent.com'; // Your Client ID

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: 'profile email',
        plugin_name: "Songify",
      }).then(() => {
        console.log("Google API client initialized successfully.");
      }).catch(error => {
        console.error("Failed to initialize Google API client:", error);
      });
    }
    gapi.load('client:auth2', start);
  }, [clientId]);

  const onSuccess = (res) => {
    const profile = res.getBasicProfile();
    console.log('Login Success:');
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    alert(`Logged in successfully as ${profile.getName()}.`);
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
      alert('You have been logged out.');
      console.log('User signed out.');
    });
  };

  return (
    <div className="text-center py-4">
      <button className="btn btn-primary" onClick={handleLogin}>
        Login with Google
      </button>
      <button className="btn btn-danger ms-2" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default GoogleLoginButton;
