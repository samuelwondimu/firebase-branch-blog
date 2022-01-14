import { ChangeEvent, FC, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import EditorJS from "react-editor-js";
import { Editor_JS_TOOLS } from "../helpers/editorTools";
import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import { CenterBox } from "../components";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { api } from "../services/api";
import { BlogType } from "../services/types";
import { useAuth } from "../hooks/user-auth";
import { readTime } from "../helpers/readTIme";
import { createBlog } from "../services/firebase";

export const CreateBlog: FC = () => {
  const auth = useAuth();
  const instanceRef = useRef<any>();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");

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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageUrl(url);
          });
        }
      );
    },
  });

  const handleSave = async () => {
    const blockData = await instanceRef.current
      .save()
      .then((data: any) => data.blocks);

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
      status: true,
      createdAt: new Date().toDateString(),
      deleted: false,
      likes: [],
      mainBlog: blockData,
      comments: [],
    };

    console.log(blog);
    await createBlog(blog);
  };

  return (
    <Paper>
      <Stack
        display={"flex"}
        direction="row"
        justifyContent={"space-between"}
        sx={{ background: "#eeeeee", p: 2 }}
        alignItems={"center"}
      >
        <Button variant="contained" onClick={handleSave}>
          save
        </Button>
      </Stack>
      <Box
        sx={{
          height: "80vh",
          overflow: "scroll",
        }}
      >
        <CenterBox>
          <Box sx={{ width: 650 }} alignItems={"center"}>
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
            <Box
              {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
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
            <Box pt={4} />
            <EditorJS
              placeholder={"Tell Your Story"}
              tools={Editor_JS_TOOLS}
              instanceRef={(instance) => {
                instanceRef.current = instance;
              }}
            />
          </Box>
        </CenterBox>
      </Box>
    </Paper>
  );
};
