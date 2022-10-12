import React, { useMemo } from "react";
import { usePersons } from "../../hooks/usePersons";
import { COLUMNS } from "../../columns";
import PersonsTable from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

const Users = () => {
  const navigate = useNavigate();
  const { data, isLoading } = usePersons();
  const columns = useMemo(() => COLUMNS, []);
  if (isLoading || !data) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px 0px",
        }}
      >
        <Button
          onClick={() => {
            navigate("/persons/add");
          }}
          variant="contained"
        >
          Add User
        </Button>
      </Box>
      <PersonsTable tableData={data?.data} columns={columns} />
    </>
  );
};

export default Users;
