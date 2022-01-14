import { CommentBankOutlined, Favorite } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Comment } from "../components";
import jsonToJSX from "../helpers/jsonToJSX";
import { useAuth } from "../hooks/user-auth";
import {
  addComment,
  countNumberOfViews,
  getBlogById,
  getComments,
  likeBlog,
  unlikeBlog,
} from "../services/firebase";
import { BlogType, CommentType } from "../services/types";

export const BlogById: FC = () => {
  const id = useParams().id;
  const auth = useAuth();
  const [blog, setBlog] = useState<BlogType>();
  const [comments, setComments] = useState<CommentType[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  async function onSubmit(values: any) {
    if (!auth?.user) return;
    await addComment(
      id,
      `${auth?.user?.uid}`,
      `${auth?.user?.displayName}`,
      values.comment,
      `${auth?.user?.photoURL}`
    );
    setComments(
      [
        ...comments,
        {
          docId: "",
          avatar: `${auth?.user?.photoURL}`,
          userName: `${auth?.user?.displayName}`,
          blogId: id,
          commentText: values.comment,
          reply: [],
          userId: auth?.user?.uid,
          createdAt: new Date().toISOString(),
        },
      ].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
    );
  }

  async function handleLike() {
    if (!auth?.user) return;
    const liked = await blog?.likes?.includes(auth?.user?.uid);
    console.log(liked);
    if (liked) {
      await unlikeBlog(`${auth?.user?.uid}`, id);
      blog?.likes &&
        setBlog({
          ...blog,
          likes: blog?.likes?.filter((like) => like !== `${auth?.user?.uid}`),
        });
      return;
    } else {
      await likeBlog(`${auth?.user?.uid}`, id);
      blog?.likes &&
        setBlog({ ...blog, likes: [...blog?.likes, auth?.user?.uid] });
    }
  }

  useEffect(() => {
    getBlogById(id).then((blog) => {
      setBlog(blog);
    });

    getComments(`${id}`).then((comments) => {
      setComments(
        comments.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
      );
    });

    countNumberOfViews(`${id}`, `${auth?.user?.uid}`);
  }, [id]);

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
          <Stack direction={"row"} spacing={2}>
            <Button
              size="small"
              variant="contained"
              color="error"
              startIcon={<Favorite />}
              onClick={handleLike}
            >
              {blog?.likes?.length} likes
            </Button>
            <Button size="small" startIcon={<CommentBankOutlined />} disabled>
              {blog?.comments?.length} comments
            </Button>
          </Stack>
        </Paper>

        <Paper sx={{ mt: 2, p: 2 }}>
          <Typography variant="h6" gutterBottom fontWeight={"bold"}>
            Comments
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {errors?.email && (
              <Alert sx={{ width: "100%" }} severity="error">
                {errors?.email?.message}
              </Alert>
            )}
            <TextField
              fullWidth
              multiline
              rows={4}
              {...register("comment", {
                required: "Required",
              })}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Comment
            </Button>
          </Box>
          {comments.map((comment) => (
            <Comment key={comment.docId} comment={comment} />
          ))}
        </Paper>
      </Container>
    </>
  );
};
