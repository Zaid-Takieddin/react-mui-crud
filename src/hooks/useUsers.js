import { useMutation } from "react-query";
import { request } from "../utils/axios-utils";

const addUser = (user) => {
  return request({
    url: "/register",
    method: "post",
    data: user,
  });
};

const getUser = (user) => {
  return request({
    url: "/login",
    method: "post",
    data: user,
  });
};

export const useRegister = () => {
  return useMutation(addUser, {
    onSuccess: (data) => {
      localStorage.setItem("userToken", data.data.accessToken);
    },
  });
};

export const useLogin = () => {
  return useMutation(getUser, {
    onSuccess: (data) => {
      localStorage.setItem("userToken", data.data.accessToken);
    },
  });
};
