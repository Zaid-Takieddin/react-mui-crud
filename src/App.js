import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./screens/users";
import RegisterForm from "./screens/auth/RegisterForm";
import Authenticated from "./screens/layouts/Authenticated";
import { useAuth } from "./context/auth-context";
import Unauthenticated from "./screens/layouts/Unauthenticated";
import UpdateForm from "./screens/users/UpdateForm";
import AddForm from "./screens/users/AddForm";
import LoginForm from "./screens/auth/LoginForm";

function App() {
  const user = useAuth();
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        {user.data && (
          <Route path="/" element={<Authenticated />}>
            <Route index element={<Users />} />
            <Route path="persons/:personId" element={<UpdateForm />} />
            <Route path="persons/add" element={<AddForm />} />
          </Route>
        )}
        {!user.data && (
          <Route path="/" element={<Unauthenticated />}>
            <Route index element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
