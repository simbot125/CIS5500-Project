import React, { useEffect } from 'react';
import { gapi } from 'gapi-script';

const GoogleLoginButton = () => {
  const clientId = '594406784673-40nnncocga8lguoufi8agci7378cukft.apps.googleusercontent.com';

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: 'profile email',
        // Optional: set a specific redirect URI if necessary
        redirect_uri: 'http://localhost:3000', // Ensure this matches Google Cloud settings
      });
    }
    gapi.load('client:auth2', start);
  }, [clientId]);

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully as ${res.profileObj.name}. See console for full profile object.`
    );
  };

  const onFailure = (err) => {
    console.error('Login failed: res:', err);
    alert('Failed to login. Please try again.');
  };

  const handleLogin = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance
      .signIn()
      .then((res) => onSuccess(res))
      .catch((err) => onFailure(err));
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
