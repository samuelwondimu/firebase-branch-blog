import { Container, Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { BlogCard } from "../components";
import { getBlogs } from "../services/firebase";
import { BlogType } from "../services/types";
// import { useAuth } from "../hooks/user-auth";

export const Blogs: FC = () => {
  // const auth = useAuth();
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    getBlogs().then((data) => {
      if (data) {
        setBlogs(data);
      }
    });
  }, []);

  console.log(blogs);
  return (
    <>
      <Container>
        <Grid container spacing={3}>
          {blogs.map((blog) => {
            return <BlogCard key={blog.id}  blog={blog} />;
          })}
          {blogs.map((blog) => {
            return <BlogCard key={blog.id} blog={blog} />;
          })}
          {blogs.map((blog) => {
            return <BlogCard key={blog.id} blog={blog} />;
          })}
          {blogs.map((blog) => {
            return <BlogCard key={blog.id} blog={blog} />;
          })}
          {blogs.map((blog) => {
            return <BlogCard key={blog.id} blog={blog} />;
          })}
          {blogs.map((blog) => {
            return <BlogCard key={blog.id} blog={blog} />;
          })}
        </Grid>
      </Container>
    </>
  );
};
