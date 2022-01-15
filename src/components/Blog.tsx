import { FC, useEffect, useState } from "react";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import jsonToJSX from "../helpers/jsonToJSX";
import { addComment, getBlogById } from "../services/firebase";
// import { Comment } from "./Comment";
import { BlogType } from "../services/types";

export const Blog: FC = () => {
  let { id } = useParams<any>();

  const { register, handleSubmit } = useForm();

  const [blog, setBlog] = useState<BlogType>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleComment = async (values: any) => {
    setLoading(true);
    const { comment } = values;
    const newComment = {
      blogId: id,
      userId: "92379n9wefuqe9",
      userName: "samuel",
      commentText: comment,
      avatar: "samuel wondimu",
    };
    addComment(
      newComment.blogId,
      newComment.userId,
      newComment.userName,
      newComment.commentText,
      newComment.avatar
    );
    setLoading(false);
    // setBlog([ ...blog, { ...comment }]);
  };

  const handleLike = async () => {};

  useEffect(() => {
    async function blogByID() {
      const response = await getBlogById(id);
      setLoading(true);
      setBlog(response);
      setLoading(false);
    }
    blogByID();
  }, [id]);

  return (
    <>
      <Container maxWidth="lg">
        {loading ? (
          <h1>loading</h1>
        ) : (
          <>
            <article>
              {/* Desicription */}
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                fontWeight={"bold"}
                sx={{ fontSize: { xs: "2rem" } }}
              >
                {blog?.title}
              </Typography>
              <Paper
                elevation={0}
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
              {/* block data JSON */}
              <>{jsonToJSX(blog?.mainBlog?.blockData)}</>

              {/* Likes */}
              <Button startIcon={<FavoriteIcon />} onClick={handleLike}>
                5
              </Button>
              <Button startIcon={<FavoriteBorderIcon />} onClick={handleLike}>
                10
              </Button>

              {/* comment form */}
              <Box sx={{ py: 2 }}>
                <form onSubmit={handleSubmit(handleComment)}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="write comment here...."
                    {...register("comment", { required: true })}
                  />
                  <Button type="submit" variant="contained" sx={{ my: 2 }}>
                    Comment
                  </Button>
                </form>
              </Box>

              {/* comments
              {blog?.comments?.map((comment) => (
                <Comment comment={comment} />
              ))} */}
            </article>
          </>
        )}
      </Container>
    </>
  );
};
