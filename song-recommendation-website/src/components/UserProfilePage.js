import React, { useState, useEffect } from 'react';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Set loading to false after retrieving user data
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>; // Display loading indicator centered on the page
  }

  if (!user) {
    return <div className="text-center mt-5">No user data found. Please log in.</div>; // Handle case where user data is missing
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 text-center">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Profile Picture</h3>
              {/* Placeholder for profile picture */}
              <div className="mb-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="User Avatar"
                  className="rounded-circle img-fluid"
                />
              </div>
              <h4 className="card-title">{user.username}</h4>
              <p className="text-muted">{user.email}</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">User Information</h3>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Username: </strong>{user.username}
                </li>
                <li className="list-group-item">
                  <strong>Email: </strong>{user.email}
                </li>
                <li className="list-group-item">
                  <strong>Bio: </strong>{user.bio || 'No bio available'}
                </li>
              </ul>
              {/* Additional User Information can be added here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
