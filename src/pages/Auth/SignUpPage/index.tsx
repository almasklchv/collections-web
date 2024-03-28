import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../../schemas/sign-up-schema";
import { User } from "../../../entities/user";
import { useSignUpMutation } from "../../../api/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [signUp, result] = useSignUpMutation();
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Partial<User>> = (data) => {
    signUp(data);
  };

  useEffect(() => {
    if (
      result.error &&
      "status" in result.error &&
      result.error.status === 409
    ) {
      setSignUpError("Account with this email already exists.");
    }

    if (result.data) {
      navigate("/auth/sign-in");
    }
  }, [result, navigate]);

  return (
    <Box width={350}>
      <form
        action=""
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl>
          <InputLabel htmlFor="name">Full Name</InputLabel>
          <Input
            {...register("name")}
            type="text"
            id="name"
            aria-describedby="Your full name"
          />
          <FormHelperText error>{errors.name?.message}</FormHelperText>
        </FormControl>

        <FormControl sx={{ marginTop: 2 }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            {...register("email")}
            type="email"
            id="email"
            aria-describedby="Your email"
          />
          <FormHelperText error>
            {errors.email?.message || signUpError}
          </FormHelperText>
        </FormControl>

        <FormControl sx={{ marginTop: 2 }}>
          <InputLabel htmlFor="email">Password</InputLabel>
          <Input
            {...register("password")}
            type="password"
            id="password"
            aria-describedby="Your password"
          />
          <FormHelperText error>{errors.password?.message}</FormHelperText>
        </FormControl>

        <FormControl sx={{ marginTop: 2 }}>
          <InputLabel htmlFor="email">Confirm Password</InputLabel>
          <Input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            aria-describedby="Confirm your password"
          />
          <FormHelperText error>
            {errors.confirmPassword?.message}
          </FormHelperText>
        </FormControl>

        <Button variant="contained" type="submit" sx={{ marginTop: 5 }}>
          Sign Up
        </Button>
        <Typography
          variant="caption"
          sx={{ margin: "0 auto", marginTop: "15px" }}
        >
          Already have an account? <Link to={"/auth/sign-in"}>Sign in</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default SignUpPage;
