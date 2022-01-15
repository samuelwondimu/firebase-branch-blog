import { Container, Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { BlogCard } from "../components";
import { getBlogs } from "../services/firebase";
import { BlogType } from "../services/types";
// import { useAuth } from "../hooks/user-auth";
import { LoadingIndicator } from "../components/LoadingIndicator";

export const Blogs: FC = () => {
  // const auth = useAuth();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getBlogs().then((data) => {
      if (data) {
        setBlogs(data.filter((blog) => blog.status));
        setLoading(false);
      }
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          {loading && (
            <>
              <LoadingIndicator />
            </>
          )}
          {blogs.map((blog) => {
            return <BlogCard key={blog.id} blog={blog} />;
          })}
        </Grid>
      </Container>
    </>
  );
};
