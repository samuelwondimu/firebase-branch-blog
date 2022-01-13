import { FC, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  Paper,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { CenterBox } from "../components";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/user-auth";

export const SignIn: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  async function onSubmit(values: any) {
    setLoading(true);
    try {
      await auth?.signin(values.email, values.password);
      navigate("/");
      setLoading(false);
    } catch (error: any | unknown) {
      setError(error.code);
    }
    setLoading(false);
  }

  return (
    <>
      <CenterBox>
        <Paper sx={{ p: 4, width: 500 }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <Alert sx={{ width: "100%" }} severity="error">
                {error}
              </Alert>
            )}
            <Typography variant="h5" textAlign={"center"}>
              Sign in
            </Typography>
            <TextField
              type="email"
              margin="normal"
              fullWidth
              placeholder="Email"
              color="primary"
              {...register("email", {
                required: "Required",
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
              margin="normal"
              fullWidth
              color="primary"
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? "loading.." : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgotpassword">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </CenterBox>
    </>
  );
};
