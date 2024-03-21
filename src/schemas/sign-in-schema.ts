import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup.string().email("Invalid email.").required("Email is required."),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/,
      "Your password is weak!"
    )
    .required("Password is required"),
});
