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
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [signIn, result] = useSignInMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Partial<User>> = async (data) => {
    signIn(data);
    // localStorage.setItem(accessToken, "token");
  };

  useEffect(() => {
    if (result.data?.accessToken) {
      localStorage.setItem("token", result.data.accessToken);
    }
  }, [result, navigate]);

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
          <FormHelperText error>{errors.password?.message}</FormHelperText>
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
