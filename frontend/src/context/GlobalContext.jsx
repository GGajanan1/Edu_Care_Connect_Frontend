import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <GlobalContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </GlobalContext.Provider>
  );
};