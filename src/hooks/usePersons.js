import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { request } from "../utils/axios-utils";

const fetchPersons = () => {
  return request({
    url: "/664/persons",
    method: "get",
  });
};

const fetchPerson = ({ queryKey }) => {
  const personId = queryKey[1];
  return request({
    url: `/664/persons/${personId}`,
    method: "get",
  });
};

const deletePerson = (id, accessToken) => {
  return request({
    url: `/664/persons/${id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const addPerson = (person, accessToken) => {
  return request({
    url: "/664/persons",
    method: "post",
    data: person,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const updatePerson = (person, accessToken) => {
  return request({
    url: `/664/persons/${person.id}`,
    method: "put",
    data: person,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const usePersons = () => {
  return useQuery("persons", fetchPersons);
};

export const usePerson = (personId) => {
  const queryClient = useQueryClient();

  return useQuery(["person", parseInt(personId)], fetchPerson, {
    initialData: () => {
      const person = queryClient
        .getQueryData("persons")
        ?.data?.find((person) => person.id === parseInt(personId));
      if (person) {
        return { data: person };
      } else {
        return undefined;
      }
    },
  });
};

export const useAddPerson = () => {
  const navigate = useNavigate();
  const { data } = useAuth();
  const accessToken = data?.data?.accessToken;
  return useMutation((person) => addPerson(person, accessToken), {
    onSuccess: () => {
      navigate("/");
    },
  });
};

export const useDeletePerson = () => {
  const { data } = useAuth();
  const accessToken = data?.data?.accessToken;
  const queryClient = useQueryClient();
  return useMutation((id) => deletePerson(id, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("persons");
    },
  });
};

export const useUpdatePerson = () => {
  const navigate = useNavigate();
  const { data } = useAuth();
  const accessToken = data?.data?.accessToken;
  const queryClient = useQueryClient();
  return useMutation((person) => updatePerson(person, accessToken), {
    onSuccess: () => {
      queryClient.invalidateQueries("persons");
      navigate("/");
    },
  });
};
