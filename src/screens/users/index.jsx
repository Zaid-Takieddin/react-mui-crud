import React, { useMemo } from "react";
import { usePersons } from "../../hooks/usePersons";
import { COLUMNS } from "../../columns";
import PersonsTable from "../../components/Table";

const Users = () => {
  const { data, isLoading } = usePersons();
  const columns = useMemo(() => COLUMNS, []);
  if (isLoading || !data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <PersonsTable tableData={data?.data} columns={columns} />
    </div>
  );
};

export default Users;
