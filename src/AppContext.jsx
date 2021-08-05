import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

/**
 * @typedef AppContextType
 * @property {string} alertText
 * @property {function()} showAlert
 * @property {function ()} closeAlert
 */

/**
 * @returns {AppContextType}
 */
export const useAppContext = () => useContext(AppContext);

export default ({ children }) => {
  const [alertText, setAlertText] = useState('');

  return (
    <AppContext.Provider
      value={{
        alertText,
        showAlert: setAlertText,
        closeAlert: () => setAlertText(''),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
