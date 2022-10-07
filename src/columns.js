import { Box, Button } from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/auth-context";
import { useDeletePerson } from "./hooks/usePersons";

export const COLUMNS = [
  {
    Header: "First Name",
    accessor: "first_name",
  },
  {
    Header: "Last Name",
    accessor: "last_name",
  },
  {
    Header: "Date of Birth",
    accessor: "date_of_birth",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Country",
    accessor: "country",
  },
  {
    Header: "Actions",
    Cell: ({ row }) => {
      const { mutate: deletePerson } = useDeletePerson();
      const navigate = useNavigate();
      // const { data } = useAuth();
      // console.log(data?.data?.accessToken);
      return (
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              deletePerson(row.original.id);
            }}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate(`/persons/${row.original.id}`);
            }}
          >
            Update
          </Button>
        </Box>
      );
    },
  },
];
