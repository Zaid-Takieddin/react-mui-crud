import * as yup from "yup";

export const schema = yup
  .object()
  .shape({
    first_name: yup.string().required("Enter a valid name"),
    last_name: yup.string().required("Enter a valid name"),
    date_of_birth: yup.date().required(),
    country: yup.string().required(),
  })
  .required();
