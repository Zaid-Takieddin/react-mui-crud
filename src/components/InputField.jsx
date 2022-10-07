import { TextField } from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";

const InputField = ({ name, control, label, type, sx }) => {
  const {
    field: { onChange, onBlur, name: fieldName, value, ref },
    fieldState: { error, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: true },
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
      {error && error.message}
    </>
  );
};

export default InputField;
