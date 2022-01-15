import { FC, useState } from "react";
import {
  Alert,
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useForm } from "react-hook-form";
import { CenterBox } from "../components";
import { useAuth } from "../hooks/user-auth";

export const ForgotPassword: FC = () => {
  const auth = useAuth();
  const [error, setError] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  async function onSubmit(values: any) {
    try {
      await auth
        ?.passwordResetEmail(values.email)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          setError(`${error.message}`);
        });
    } catch (error: any | unknown) {
      setError(error.code);
    }
  }

  return (
    <>
      <CenterBox>
        <Box>
          {error && (
            <Alert sx={{ width: "100%" }} severity="error">
              {error}
            </Alert>
          )}

          <Typography variant="h5" textAlign={"center"} sx={{ py: 2 }}>
            Reset Password
          </Typography>

          {errors?.email && (
            <Alert sx={{ width: "100%" }} severity="error">
              {errors?.email?.message}
            </Alert>
          )}

          <Paper
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              type="email"
              placeholder="Your Email Here..."
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              type="submit"
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
            >
              <LockResetIcon />
            </IconButton>
            
          </Paper>
        </Box>
      </CenterBox>
    </>
  );
};
