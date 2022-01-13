import { Box, Container } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { CenterBox } from ".";
import { getBlogs } from "../services/firebase";
import { BlogType } from "../services/types";
import { BLogCard } from "./BlogCard";

export const Blogs: FC = () => {
  const [blogs, setBlogs] = useState<BlogType[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function blogs() {
      setLoading(true);
      const response = await getBlogs();
      setBlogs(response);
      setLoading(false);
    }
    blogs();
  }, []);

  return (
    <>
      <Container>
        {loading ? (
          <CenterBox>
            <CircularProgress />
          </CenterBox>
        ) : (
          blogs?.map((blog: any) => {
            return (
              <Box key={blog.docId} py={2}>
                <BLogCard
                  blogger={blog.blogger}
                  bloggerId={blog.bloggerId}
                  bloggerImage={blog.bloggerImage}
                  coverImage={blog.coverImage}
                  createdAt={blog.createdAt}
                  deleted={blog.deleted}
                  description={blog.description}
                  docId={blog.docId}
                  numComments={blog.numComments}
                  numLikes={blog.numLikes}
                  numViews={blog.numViews}
                  readTime={blog.readTime}
                  status={blog.status}
                  title={blog.title}
                />
              </Box>
            );
          })
        )}
      </Container>
    </>
  );
};
