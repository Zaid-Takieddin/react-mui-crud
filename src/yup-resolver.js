import * as yup from "yup";

export const personsSchema = yup
  .object()
  .shape({
    first_name: yup.string().required("Enter a valid name"),
    last_name: yup.string().required("Enter a valid name"),
    date_of_birth: yup.date().required(),
    country: yup.string().required(),
  })
  .required();

export const usersSchema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min("6").required(),
  })
  .required();
