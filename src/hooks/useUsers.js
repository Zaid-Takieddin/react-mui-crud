import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const addUser = (user) => {
  return axios.post("http://localhost:4000/register", user);
};

export const useRegister = () => {
  // const navigate = useNavigate();

  return useMutation(addUser, {
    onSuccess: () => {
      // navigate("/");
    },
  });
};
