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
import { schema } from "../../../schemas/sign-in-schema";
import { User } from "../../../entities/user";
import { useSignInMutation } from "../../../api/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetUserMutation } from "../../../api/users";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [signIn, signInResult] = useSignInMutation();
  const [getUser, getUserResult] = useGetUserMutation();
  const [email, setEmail] = useState<string>();
  const [signInError, setSignInError] = useState("");

  const onSubmit: SubmitHandler<Partial<User>> = async (data) => {
    signIn(data);
    setEmail(data.email);
  };

  useEffect(() => {
    if (signInResult.error) {
      setSignInError("Invalid credentials.");
    }

    if (signInResult.data?.accessToken && email) {
      localStorage.setItem("token", signInResult.data.accessToken);
      getUser(email);
    }
  }, [signInResult]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(getUserResult.data));
    if (signInResult.data?.accessToken && getUserResult.isSuccess)
      window.location.href = "/";
  }, [getUserResult]);

  return (
    <Box width={350}>
      <form
        action=""
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl sx={{ marginTop: 2 }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            {...register("email")}
            type="email"
            id="email"
            aria-describedby="Your email"
          />
          <FormHelperText error>{errors.email?.message}</FormHelperText>
        </FormControl>

        <FormControl sx={{ marginTop: 2 }}>
          <InputLabel htmlFor="email">Password</InputLabel>
          <Input
            {...register("password")}
            type="password"
            id="password"
            aria-describedby="Your password"
          />
          <FormHelperText error>
            {errors.password?.message || signInError}
          </FormHelperText>
        </FormControl>

        <Button variant="contained" type="submit" sx={{ marginTop: 5 }}>
          Sign In
        </Button>
        <Typography
          variant="caption"
          sx={{ margin: "0 auto", marginTop: "15px" }}
        >
          Don't have an account? <Link to={"/auth/sign-up"}>Create</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default SignInPage;
