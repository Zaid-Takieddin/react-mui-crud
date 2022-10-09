import { Box, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { useAddPerson } from "../../hooks/usePersons";
import { personsSchema } from "../../yup-resolver";
import { yupResolver } from "@hookform/resolvers/yup";

const AddForm = () => {
  const navigate = useNavigate();
  const { mutate: addPerson } = useAddPerson();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(personsSchema),
  });

  const submit = (data) => {
    addPerson(data);
  };

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
            Add
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

export default AddForm;
