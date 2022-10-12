import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
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

const deletePerson = (id) => {
  return request({
    url: `/664/persons/${id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
};

const addPerson = (person) => {
  return request({
    url: "/664/persons",
    method: "post",
    data: person,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  });
};

const updatePerson = (person) => {
  return request({
    url: `/664/persons/${person.id}`,
    method: "put",
    data: person,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
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
  return useMutation(addPerson, {
    onSuccess: () => {
      navigate("/");
    },
  });
};

export const useDeletePerson = () => {
  const queryClient = useQueryClient();
  return useMutation(deletePerson, {
    onSuccess: () => {
      queryClient.invalidateQueries("persons");
    },
  });
};

export const useUpdatePerson = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation(updatePerson, {
    onSuccess: () => {
      queryClient.invalidateQueries("persons");
      navigate("/");
    },
  });
};
