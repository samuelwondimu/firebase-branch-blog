import { ChangeEvent, FC, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import EditorJS from "react-editor-js";
import { Editor_JS_TOOLS } from "../helpers/editorTools";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { api } from "../services/api";
import { BlogType } from "../services/types";
import { useAuth } from "../hooks/user-auth";
import { readTime } from "../helpers/readTIme";
import { createBlog } from "../services/firebase";
import { CenterBox } from "../components";
import { useNavigate } from "react-router-dom";
import { SaveAltOutlined } from "@mui/icons-material";

function LinearDeterminate({ progress }: { progress: number }) {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}

export const CreateBlog: FC = () => {
  const auth = useAuth();
  const instanceRef = useRef<any>();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop: async (acceptedFiles) => {
      const file: File = acceptedFiles[0];
      const uploadTask = uploadBytesResumable(api.sotrageRef(file), file, {
        contentType: "image/jpeg",
      });
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setLoading(true);
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          setError(error.message);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageUrl(url);
            setProgress(0);
            setLoading(false);
          });
        }
      );
    },
  });

  const handleSave = async () => {
    const blockData = await instanceRef.current
      .save()
      .then((data: any) => data.blocks);

    setLoading(true);

    if (blockData && title && imageUrl) {
      const { time, paragraph } = readTime(blockData);

      let blog: BlogType = {
        id: "",
        title: `${title}`,
        coverImage: `${imageUrl}`,
        blogger: `${auth?.user?.displayName}`,
        bloggerId: `${auth?.user?.uid}`,
        bloggerImage: `${auth?.user?.photoURL}`,
        description: paragraph,
        numComments: 0,
        numLikes: 0,
        numViews: 0,
        readTime: time,
        status: false,
        createdAt: new Date().toDateString(),
        deleted: false,
        likes: [],
        mainBlog: blockData,
        comments: [],
      };

      console.log(blog);
      await createBlog(blog)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          setError(err.message);
        
        })
        .finally(() => {
          setLoading(false);
          navigate("/blogger/my-blogs");
        });
    } else {
      setError("Please fill all the fields");
      setLoading(false);
      return;
    }
  };

  console.log(progress);

  return (
    <Paper>
      <Stack
        display={"flex"}
        direction="row"
        justifyContent={"space-between"}
        sx={{ background: "#eeeeee", p: 2 }}
        alignItems={"center"}
      >
        <Button
          variant="contained"
          onClick={handleSave}
          startIcon={
            loading ? (
              <CircularProgress size={15} color="inherit" />
            ) : (
              <SaveAltOutlined />
            )
          }
        >
          save
        </Button>
      </Stack>
      <Box pt={2} width={650} sx={{ m: "0 auto" }}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          placeholder="Title"
          multiline
          fullWidth
          variant="standard"
          InputProps={{
            sx: {
              fontSize: 40,
              fontWeight: 550,
              pb: 3,
            },
            disableUnderline: true,
          }}
          onChange={(e: ChangeEvent<{ value: string }>) => {
            setTitle(e.currentTarget.value);
          }}
        />

        {progress && !imageUrl ? (
          <>
            <LinearDeterminate progress={progress} />
            <Box pb={2} />
          </>
        ) : null}

        {imageUrl ? (
          <img src={imageUrl} alt="cover" />
        ) : (
          !loading && (
            <Box
              {...getRootProps({
                isDragActive,
                isDragAccept,
                isDragReject,
              })}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "100px",
                borderWidth: "2px",
                borderRadius: "2px",
                borderStyle: "dashed",
                backgroundColor: "#fafafa",
                color: "#bdbdbd",
                outline: "none",
                transition: "border .24s ease-in-out",
              }}
            >
              <input {...getInputProps()} />
              <p>Drag and drop Cover image here, or click to select files</p>
            </Box>
          )
        )}

        {imageUrl && (
          <Button onClick={() => setImageUrl("")}>remove image</Button>
        )}
      </Box>

      <Box pt={4} />
      <EditorJS
        placeholder={"Tell Your Story"}
        tools={Editor_JS_TOOLS}
        instanceRef={(instance) => {
          instanceRef.current = instance;
        }}
      />
    </Paper>
  );
};
