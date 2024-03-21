import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, "First letter must be uppercase")
    .required("Full Name is required."),
  email: yup.string().email("Invalid email.").required("Email is required."),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/,
      "Your password is weak!"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("You need to confirm your password."),
});
