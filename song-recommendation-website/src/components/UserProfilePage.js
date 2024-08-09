import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../UserProfilePage.css';

const UserProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState('');
  const [editBio, setEditBio] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.username === username) {
        setUser(userData);
        setEditUsername(userData.username);
        setEditBio(userData.bio || '');
      }
    } else {
      // Ensure user exists in the backend, create if necessary
      fetch('/api/ensure-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email: `${username}@example.com`, bio: '' }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to ensure user');
          }
          return response.json();
        })
        .then(data => {
          setUser(data);
          setEditUsername(data.username);
          setEditBio(data.bio || '');
          localStorage.setItem('user', JSON.stringify(data));
        })
        .catch(error => console.error('Error ensuring user:', error));
    }
  }, [username]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const updatedUser = {
      username: editUsername,
      email: user.email,
      bio: editBio,
    };

    fetch(`/api/users/${user.email}`, {  // Use email as the identifier here
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newUsername: editUsername,
        bio: editBio,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        return response.text();
      })
      .then(data => {
        console.log(data);
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        alert('There was an issue updating your profile.');
      });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      <h2>User Profile</h2>
      <div className="card">
        <div className="card-body">
          {isEditing ? (
            <>
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  value={editUsername}
                  onChange={e => setEditUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Bio:</label>
                <textarea
                  className="form-control"
                  value={editBio}
                  onChange={e => setEditBio(e.target.value)}
                />
              </div>
              <button className="btn btn-success" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={handleEditToggle}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3 className="card-title">{user.username}</h3>
              <p className="card-text"><strong>Email:</strong> {user.email}</p>
              <p className="card-text"><strong>Bio:</strong> {user.bio || 'No bio available.'}</p>
              <button className="btn btn-primary" onClick={handleEditToggle}>
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
      <div className="mt-4 text-center">
        <Link to="/" className="btn btn-link">Back to Home</Link>
      </div>
    </div>
  );
};

export default UserProfilePage;
