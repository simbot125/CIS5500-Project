import React, { useState, useEffect } from 'react';

const UserProfilePage = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user profile data from API
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user profile:', error));
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <h2>User Profile</h2>
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{user.display_name}</h3>
          <p className="card-text"><strong>Email:</strong> {user.email}</p>
          <p className="card-text"><strong>Username:</strong> {user.username}</p>
          <p className="card-text"><strong>Bio:</strong> {user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
