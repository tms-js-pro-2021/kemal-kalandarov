import React from 'react';
import { useAppContext } from '../../AppContext';
// import './CustomAlert.css';

export default function CustomAlert() {
  const { alertText, closeAlert } = useAppContext();

  if (!alertText) return null;

  return (
    <div className="page-alert">
      {alertText}
      <button type="button" onClick={closeAlert}>
        close
      </button>
    </div>
  );
}
