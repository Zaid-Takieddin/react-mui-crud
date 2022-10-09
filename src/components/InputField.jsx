import { TextField, Typography } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

const InputField = ({ name, control, label, type, sx }) => {
  const {
    field: { onChange, onBlur, name: fieldName, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <>
      <TextField
        error={!!error}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={fieldName}
        inputRef={ref}
        label={label}
        type={type || "text"}
        sx={{
          ...sx,
          input: { color: "white" },
          borderColor: "white",
        }}
      />
      {error && (
        <Typography sx={{ color: "red", marginTop: "-10px", fontSize: "12px" }}>
          {error.message}
        </Typography>
      )}
    </>
  );
};

export default InputField;
