import { Box, Button } from "@mui/material";
import { format, formatISO, parseISO } from "date-fns";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../components/InputField";
import { usePerson, useUpdatePerson } from "../../hooks/usePersons";

const UpdateForm = () => {
  const { personId } = useParams();
  const { data, isLoading } = usePerson(personId);
  const navigate = useNavigate();
  const { mutate: updatePerson } = useUpdatePerson();

  const { handleSubmit, control } = useForm({
    defaultValues: {
      first_name: data?.data?.first_name,
      last_name: data?.data?.last_name,
      date_of_birth: format(new Date(data?.data?.date_of_birth), "yyyy-MM-dd"),
      country: data?.data?.country,
    },
  });

  const submit = (data) => {
    const person = {
      ...data,
      id: personId,
      date_of_birth: formatISO(parseISO(data.date_of_birth)),
    };
    updatePerson(person);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => {
        submit(data);
      })}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        height: "100vh",
        width: "full",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
          padding: "30px",
          backgroundColor: "#404040",
          borderRadius: "20px",
          width: "full",
        }}
      >
        <InputField control={control} name="first_name" label="First Name" />
        <InputField control={control} name="last_name" label="Last Name" />
        <InputField
          control={control}
          name="date_of_birth"
          label="Date of Birth"
          type="date"
          sx={{ width: "full" }}
        />
        <InputField control={control} name="country" label="Country" />
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button variant="contained" color="success" type="submit">
            Update
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateForm;
