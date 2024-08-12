import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); 
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setUsername(parsedUser.username);
      setBio(parsedUser.bio);
    }
    setLoading(false); 
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleSave = async () => {
    if (!user) return;
  
    try {
      const response = await fetch(`http://localhost:3001/api/users/${user.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newUsername: username, bio }),
      });
  
      if (response.ok) {
        const updatedUser = { ...user, username, bio };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false); 
      } else {
        console.error('Failed to update user information.');
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>; 
  }

  if (!user) {
    return <div className="text-center mt-5">No user data found. Please log in.</div>; 
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 text-center">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Profile Picture</h3>
              <div className="mb-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="User Avatar"
                  className="rounded-circle img-fluid"
                />
              </div>
              <h4 className="card-title">{user.username}</h4>
              <p className="text-muted">{user.email}</p>
              <button className="btn btn-primary mt-3" onClick={handleGoHome}>Home</button> {/* Home Button */}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">User Information</h3>
              {isEditing ? (
                <>
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="bio">Bio:</label>
                    <textarea
                      className="form-control"
                      id="bio"
                      rows="3"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                  </div>
                  <button className="btn btn-success mt-3" onClick={handleSave}>Save</button>
                  <button className="btn btn-secondary mt-3 ms-2" onClick={handleEditToggle}>Cancel</button>
                </>
              ) : (
                <>
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
                  <button className="btn btn-primary mt-3" onClick={handleEditToggle}>Edit Profile</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
