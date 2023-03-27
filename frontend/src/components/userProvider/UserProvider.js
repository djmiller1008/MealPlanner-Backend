import React, { createContext, useContext } from 'react';
import { useLocalState } from '../util/LocalStorageUtil';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");

    const value = { jwt, setJwt };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error("useUser must be used within a UserProvider");
    }
    
    return context;
  }

export { useUser, UserProvider };
