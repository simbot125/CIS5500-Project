import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: false,
    privacy: 'public',
    apiKey: ''
  });

  useEffect(() => {
    fetch('http://localhost:3001/settings')
      .then(response => response.json())
      .then(data => setSettings(data))
      .catch(error => console.error('Error fetching settings:', error));
  }, []);

  const handleSaveSettings = () => {
    //I need to finish this
    };

  return (
    <div className="container my-5">
      <h2>Settings</h2>
      <form>
        <div className="form-group">
          <label>Notifications</label>
          <input
            type="checkbox"
            className="form-control"
            checked={settings.notifications}
            onChange={e => setSettings({ ...settings, notifications: e.target.checked })}
          />
        </div>
        <div className="form-group">
          <label>Privacy</label>
          <select className="form-control" value={settings.privacy} onChange={e => setSettings({ ...settings, privacy: e.target.value })}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="form-group">
          <label>API Key</label>
          <input
            type="text"
            className="form-control"
            value={settings.apiKey}
            onChange={e => setSettings({ ...settings, apiKey: e.target.value })}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSaveSettings}>Save Settings</button>
      </form>
    </div>
  );
};

export default SettingsPage;
