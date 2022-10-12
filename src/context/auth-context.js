import { createContext, useContext, useEffect, useState } from "react";
import { useLogin, useRegister } from "../hooks/useUsers";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const getUser = () => {
    const user = localStorage.getItem("userToken");
    return user ? user : undefined;
  };

  const { mutate: register, data: registeredUser } = useRegister();

  const { mutate: login, data: loginUser } = useLogin();

  const logout = () => {
    localStorage.removeItem("userToken");
    setUser(undefined);
  };

  const data = registeredUser || loginUser || getUser();

  useEffect(() => {
    setUser(data);
  }, [data]);

  if (!user) {
    return (
      <AuthContext.Provider value={{ user, register, login }}>
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
