import React from 'react';
import { useHistory } from 'react-router-dom';
// import './CustomAppBar.css';

export default function CustomAppBar({ title }) {
  const { replace } = useHistory();

  const handleLogout = () => {
    window.sessionStorage.token = '';
    replace('/login');
  };

  return (
    <div className="custom-app-bar-root">
      <h1>{title}</h1>
      <button
        className="custom-app-bar-button"
        type="button"
        onClick={handleLogout}
      >
        logout
      </button>
    </div>
  );
}
