import { FC, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CenterBox } from "../components";
import { useAuth } from "../hooks/user-auth";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { api } from "../services/api";

import LinearProgress from "@mui/material/LinearProgress";
import { Facebook, Google } from "@mui/icons-material";

function LinearDeterminate({ progress }: { progress: number }) {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}

export const SignUp: FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [progress, setProgress] = useState(0);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  async function uploadImage(file: File) {
    const uploadTask = uploadBytesResumable(api.sotrageRef(file), file, {
      contentType: "image/jpeg",
    });
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        setError(error.message);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url);
          setProgress(0);
        });
      }
    );
  }

  async function onSubmit(values: any) {
    try {
      await auth?.signup(
        values.email,
        values.password,
        values.name,
        `${imageUrl}`
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
        <Stack direction={"row"} spacing={2}>
          <Button
            startIcon={<Google />}
            onClick={() => auth?.signinWithGmail()}
            sx={{ py: 2, px: 3 }}
            variant="contained"
          >
            Continue With Google
          </Button>
          <Button
            startIcon={<Facebook />}
            sx={{ py: 2, px: 3 }}
            variant="contained"
            disabled
          >
            Continue With Facebook
          </Button>
        </Stack>
        <Typography sx={{ py: 2 }}>
          - or signup with email and password below -
        </Typography>
        <Paper sx={{ p: 4 }}>
          {progress ? (
            <>
              <LinearDeterminate progress={progress} />
              <Box pb={2} />
            </>
          ) : null}
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <Alert sx={{ width: "100%" }} severity="error">
                {error}
              </Alert>
            )}
            <Typography variant="h5" textAlign={"center"}>
              Sign Up
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component="input"
                accept="image/"
                id="image-upload"
                type="file"
                sx={{ display: "none" }}
                onChange={(e: { target: { files: any } }) => {
                  console.log(e.target.files);
                  uploadImage(e.target.files[0]);
                }}
              />
              <label htmlFor="image-upload">
                <IconButton color="primary" component="span" sx={{}}>
                  <Avatar
                    src={
                      imageUrl
                        ? imageUrl
                        : "https://www.pngall.com/wp-content/uploads/2/Upload-PNG.png"
                    }
                    sx={{ width: 100, height: 100 }}
                  />
                </IconButton>
              </label>
            </Box>
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
