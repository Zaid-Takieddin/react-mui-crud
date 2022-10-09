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
    defaultValue: "",
  });

  return (
    <>
      <TextField
        error={!!error}
        onChange={onChange} // send value to hook form
        onBlur={onBlur} // notify when input is touched/blur
        value={value} // input value
        name={fieldName} // send down the input name
        inputRef={ref} // send input ref, so we can focus on input when error appear
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
