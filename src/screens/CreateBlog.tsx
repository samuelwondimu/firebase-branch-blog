import { FC, useRef } from "react";
import { useDropzone } from "react-dropzone";
import EditorJS from "react-editor-js";
import { Editor_JS_TOOLS } from "../helpers/editorTools";
import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import { CenterBox } from "../components";

export const CreateBlog: FC = () => {
  const instanceRef = useRef<any>();

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    // onDrop: (acceptedFiles) => {
    //   setImageAsFile(acceptedFiles);
    //   setImagePreview(acceptedFiles.map((file: any) => URL.createObjectURL(file)));
    //   setImageUploading(true);
  });
  return (
    <Paper>
      <Stack
        display={"flex"}
        direction="row"
        justifyContent={"space-between"}
        sx={{ background: "#eeeeee", p: 2 }}
        alignItems={"center"}
      >
        <Button variant="contained">save</Button>
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
            <Box pt={4}/>
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
