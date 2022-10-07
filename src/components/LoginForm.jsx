import { Box, Button, TextField } from "@mui/material";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useUser } from "../context/user-context";
import InputField from "./InputField";

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useAuth();
  const userData = useUser();

  const submit = (data) => {
    user.register(data);
    navigate("/");
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(submit)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        height: "100vh",
      }}
    >
      <InputField name="email" control={control} label="E-mail" />
      <InputField
        name="password"
        control={control}
        label="Passwrod"
        type="password"
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default LoginForm;
