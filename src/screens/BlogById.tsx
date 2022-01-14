import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Comment } from "../components";
import jsonToJSX from "../helpers/jsonToJSX";
import { getBlogById } from "../services/firebase";
import { BlogType } from "../services/types";
import { comments } from "./comments";

export const BlogById: FC = () => {
  const id = useParams().id;
  const [blog, setBlog] = useState<BlogType>();

  useEffect(() => {
    getBlogById(id).then((blog) => {
      setBlog(blog);
    });
  }, [id]);
  console.log(blog);
  return (
    <>
      <Container>
        <Paper sx={{ p: 2, pb: 2 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight={"bold"}
            sx={{ fontSize: { xs: "2rem" } }}
          >
            {blog?.title}
          </Typography>
          <Box
            sx={{
              height: 300,
              width: "100%",
              mb: 3,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url(${blog?.coverImage})`,
            }}
          />
          {blog?.mainBlog && jsonToJSX(blog?.mainBlog)}
        </Paper>

        <Paper sx={{ mt: 2, p: 2 }}>
          <Typography variant="h6" gutterBottom fontWeight={"bold"}>
            Comments
          </Typography>
          <TextField fullWidth multiline rows={4} />
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
            Comment
          </Button>
          {comments.map((comment) => (
            <Comment key={comment.docId} comment={comment} />
          ))}
        </Paper>
      </Container>
    </>
  );
};
