import React from "react";
import { useParams } from "react-router-dom";
import { usePerson } from "../../hooks/usePersons";

const User = () => {
  const { personId } = useParams();
  const { data, isLoading } = usePerson(personId);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>{data.data.first_name}</div>;
};

export default User;
