import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { request } from "../utils/axios-utils";

const fetchPersons = () => {
  return axios.get(`http://localhost:4000/664/persons`);
};
const fetchPerson = ({ queryKey }) => {
  const personId = queryKey[1];
  return axios.get(`http://localhost:4000/664/persons/${personId}`);
};

const deletePerson = (id, accessToken) => {
  // return axios.delete(`http://localhost:4000/660/persons/${id}`);
  return request({
    url: `/664/persons/${id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const addPerson = (person) => {
  return axios.post(`http://localhost:4000/660/persons`, person);
};

const updatePerson = (person) => {
  return axios.put(`http://localhost:4000/660/persons/${person.id}`, person);
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
  // const queryClient = useQueryClient();
  return useMutation(addPerson, {
    // onMutate: async (user) => {
    //   await queryClient.cancelQueries("users");
    //   const previousUserData = queryClient.getQueryData("users");
    //   queryClient.setQueryData("users", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [
    //         ...oldQueryData.data,
    //         { id: oldQueryData?.data?.length + 1, ...user },
    //       ],
    //     };
    //   });
    //   return {
    //     previousUserData,
    //   };
    // },
    // onError: (_error, _user, context) => {
    //   return queryClient.setQueriesData("users", context.previousUserData);
    // },
    // onSettled: () => {
    //   queryClient.invalidateQueries("users");
    // },
    onSuccess: () => {
      navigate("/users");
    },
  });
};

export const useDeletePerson = () => {
  const { data } = useAuth();
  const accessToken = data?.data?.accessToken;
  const queryClient = useQueryClient();
  return useMutation((id) => deletePerson(id, accessToken), {
    // onMutate: async (userId) => {
    //   await queryClient.cancelQueries("users");
    //   const previousUserData = queryClient.getQueryData("users");
    //   queryClient.setQueryData("users", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data.filter((user) => user.id !== userId)],
    //     };
    //   });
    //   return {
    //     previousUserData,
    //   };
    // },
    // onError: (_error, _userId, context) => {
    //   queryClient.setQueryData("users", context.previousUserData);
    // },
    onSettled: () => {
      queryClient.invalidateQueries("persons");
    },
  });
};

export const useUpdatePerson = () => {
  // const navigate = useNavigate();
  // const queryClient = useQueryClient();
  return useMutation(updatePerson, {
    // onMutate: async (user) => {
    //   await queryClient.cancelQueries("users");
    //   const previousUserData = queryClient.getQueryData("users");
    //   queryClient.setQueryData("users", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [
    //         ...oldQueryData.data,
    //         { id: oldQueryData?.data?.length + 1, ...user },
    //       ],
    //     };
    //   });
    //   return {
    //     previousUserData,
    //   };
    // },
    // onError: (_error, _user, context) => {
    //   return queryClient.setQueriesData("users", context.previousUserData);
    // },
    // onSettled: () => {
    //   queryClient.invalidateQueries("users");
    // },
    // onSuccess: () => {
    //   navigate("/users");
    // },
  });
};
