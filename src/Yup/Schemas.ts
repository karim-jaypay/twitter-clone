import * as yup from "yup";

export const signupSchema = yup.object().shape({
  name: yup.string().required("What's your name?"),
  email: yup.string().email("Invalid email").required("Required"),
  day: yup.number().required("Required"),
  month: yup.string().required(),
  year: yup.number().required(),
});

export const secondSignupSchema = yup.object().shape({
  username: yup.string().required("Invalid username"),
  password: yup.string().required("Required"),
});
