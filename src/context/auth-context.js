import { createContext, useContext, useEffect, useState } from "react";
import { useRegister } from "../hooks/useUsers";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { mutate: register, data, isLoading } = useRegister();
  if (isLoading || !data) {
    return (
      <AuthContext.Provider value={{ register }}>
        {children}
      </AuthContext.Provider>
    );
  }
  return (
    <AuthContext.Provider value={{ data }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
