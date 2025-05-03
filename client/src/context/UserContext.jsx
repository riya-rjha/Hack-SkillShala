import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { mockUserData } from "../data/mockData";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(mockUserData);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
