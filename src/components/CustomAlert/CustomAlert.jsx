import React from 'react';
import './CustomAlert.css';

export default function CustomAlert({ error, closeError }) {
  return (
    <div className="page-alert">
      {error}
      <button type="button" onClick={closeError}>
        close
      </button>
    </div>
  );
}
