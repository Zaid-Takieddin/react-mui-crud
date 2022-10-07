import axios from "axios";
import { useAuth } from "../context/auth-context";

const client = axios.create({ baseURL: "http://localhost:4000" });

export const request = ({ ...options }) => {
  const { accessToken } = options;
  console.log(accessToken);
  client.defaults.headers.common.Authorization = accessToken;
  const onSuccess = (response) => response;
  const onError = (error) => {
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
