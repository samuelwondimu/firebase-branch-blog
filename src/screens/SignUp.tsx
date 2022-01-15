import { FC, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CenterBox } from "../components";
import { useAuth } from "../hooks/user-auth";

export const SignUp: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  async function onSubmit(values: any) {
    try {
      await auth?.signup(
        values.email,
        values.password,
        values.name,
        "https://pbs.twimg.com/profile_images/653700295395016708/WjGTnKGQ_400x400.png"
      );
      navigate("/");
    } catch (error: any | unknown) {
      console.log(error);
      setError(error.message);
    }
  }

  return (
    <>
      <CenterBox>
        <Paper sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <Alert sx={{ width: "100%" }} severity="error">
                {error}
              </Alert>
            )}
            <Typography variant="h5" textAlign={"center"}>
              Sign Up
            </Typography>
            <TextField
              type="e-mail"
              margin="normal"
              fullWidth
              placeholder="Email"
              {...register("email", {
                required: "Email filled is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
            {errors?.email && (
              <Alert sx={{ width: "100%" }} severity="error">
                {errors?.email?.message}
              </Alert>
            )}
            <TextField
              type="name"
              margin="normal"
              fullWidth
              placeholder="name"
              {...register("name", {
                required: "name filled is required",
              })}
            />
            {errors?.name && (
              <Alert sx={{ width: "100%" }} severity="error">
                {errors?.name?.message}
              </Alert>
            )}
            <Stack direction={"row"} spacing={2} sx={{ pt: 2 }}>
              <TextField
                type="password"
                fullWidth
                placeholder="Password"
                {...register("password", {
                  required: "Required",
                })}
              />
              {errors?.password && (
                <Alert sx={{ width: "100%" }} severity="error">
                  {errors?.password?.message}
                </Alert>
              )}
              <TextField
                type="password"
                fullWidth
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
            </Stack>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ p: 1, mt: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Box pt={2} />
          <Grid container>
            <Grid item xs>
              <Link to="/forgotpassword">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/signin">{"Already have an account? Sign In"}</Link>
            </Grid>
          </Grid>
        </Paper>
      </CenterBox>
    </>
  );
};
