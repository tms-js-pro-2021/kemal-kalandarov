import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export default ({ children }) => {
  const [label, setLabel] = useState('default label');
  return (
    <AppContext.Provider value={{ label, setLabel }} value2="ascdasdc">
      {children}
    </AppContext.Provider>
  );
};
