import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import InputField from "../../components/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { usersSchema } from "../../yup-resolver";

const RegisterForm = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(usersSchema),
  });

  const user = useAuth();

  const submit = (data) => {
    console.log(data);
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
        Sign Up
      </Button>
      <Typography sx={{ fontSize: "12px" }}>
        Already have an account?{" "}
        <Typography
          component="span"
          sx={{
            color: "#1976D2",
            fontSize: "11px",
            "&:hover": { cursor: "pointer", borderBottom: "1px solid" },
          }}
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Typography>
      </Typography>
    </Box>
  );
};

export default RegisterForm;