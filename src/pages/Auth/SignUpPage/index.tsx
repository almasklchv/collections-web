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
import { useTranslation } from "react-i18next";

const SignUpPage = () => {
  const [signUp, result] = useSignUpMutation();
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = useState("");

  const { t } = useTranslation();

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
          <InputLabel htmlFor="name">{t("signUp.nameInput")}</InputLabel>
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
          <InputLabel htmlFor="password">
            {t("signUp.passwordInput")}
          </InputLabel>
          <Input
            {...register("password")}
            type="password"
            id="password"
            aria-describedby="Your password"
          />
          <FormHelperText error>{errors.password?.message}</FormHelperText>
        </FormControl>

        <FormControl sx={{ marginTop: 2 }}>
          <InputLabel htmlFor="confirmPassword">
            {t("signUp.confirmPasswordInput")}
          </InputLabel>
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
          {t("signUp.button")}
        </Button>
        <Typography
          variant="caption"
          sx={{ margin: "0 auto", marginTop: "15px" }}
        >
          {t("signUp.haveAccount.part1")}{" "}
          <Link to={"/auth/sign-in"}>{t("signUp.haveAccount.part2")}</Link>
        </Typography>
      </form>
    </Box>
  );
};

export default SignUpPage;
