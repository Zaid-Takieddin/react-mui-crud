import { createContext, useContext } from "react";
import { useLogin, useRegister } from "../hooks/useUsers";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const {
    mutate: register,
    data: registeredUser,
    isLoading: registering,
  } = useRegister();
  const { mutate: login, data: loginUser, isLoading: logingin } = useLogin();
  const data = registeredUser || loginUser || undefined;
  const isLoading = registering || logingin;
  if (isLoading || !data) {
    return (
      <AuthContext.Provider value={{ data, register, login }}>
        {children}
      </AuthContext.Provider>
    );
  }
  return (
    <AuthContext.Provider value={{ data }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
