import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./screens/users";
import { ReactQueryDevtools } from "react-query/devtools";
import LoginForm from "./components/LoginForm";
import Authenticated from "./screens/layouts/Authenticated";
import { AuthContext, AuthProvider, useAuth } from "./context/auth-context";
import { useContext } from "react";
import Unauthenticated from "./screens/layouts/Unauthenticated";
import { useUser } from "./context/user-context";
import User from "./screens/users/User";
import UpdateForm from "./screens/users/UpdateForm";
import AddForm from "./screens/users/AddForm";

function App() {
  const user = useAuth();
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authenticated />}>
          <Route index element={<Users />} />
          <Route path="persons/:personId" element={<UpdateForm />} />
          <Route path="persons/add" element={<AddForm />} />
        </Route>
        <Route path="/register" element={<Unauthenticated />}>
          <Route index element={<LoginForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
