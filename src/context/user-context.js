import { createContext, useContext, useState } from "react";
import { useAuth } from "./auth-context";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(useAuth().user);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
export const useUser = () => useContext(UserContext);
