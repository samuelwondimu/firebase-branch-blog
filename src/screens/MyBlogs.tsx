import { Box, Paper, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { useAuth } from "../hooks/user-auth";
import { getBlogs } from "../services/firebase";
import { BlogType } from "../services/types";

export const MyBlogs: FC = () => {
  const auth = useAuth();
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs().then((res) => {
      if (res) {
        setBlogs(res.filter((blog) => blog.bloggerId === auth?.user?.uid));
        setLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: GridColDef[] = [
    {
      field: "title",
      width: 450,
      headerName: "Title",
      renderCell: (params) => {
        const { title, blogger, createdAt } = params.row;
        let blogTitle = title;
        const maxTitle = 50;

        if (title.length > maxTitle) {
          blogTitle = title.substring(0, maxTitle) + "...";
        }

        return (
          <Stack direction="column">
            <Typography variant="body1">{`${blogTitle}`}</Typography>
            <Typography variant="subtitle1" color="GrayText">
              By | {blogger} {moment(`${createdAt}`).fromNow()}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "likes",
      width: 100,
      headerName: "Likes",
      renderCell: (params) => {
        const { likes } = params.row;
        return <Typography>{`${likes.length}`}</Typography>;
      },
    },
    {
      field: "numComments",
      width: 100,
      headerName: "Comments",
    },
    {
      field: "numViews",
      width: 150,
      headerName: "Views",
    },
    {
      field: "status",
      width: 150,
      headerName: "Status",
      renderCell: (params) => {
        const { status } = params.row;
        return (
          <>
            <Box
              sx={{
                bgcolor: status ? "green" : "yellow",
                p: 1,
                px: 2,
                fontWeight: "bold",
              }}
            >
              {status ? "published" : "pending"}
            </Box>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Paper>
        <Box
          sx={{
            height: "85vh",
          }}
        >
          <DataGrid
            style={{ padding: "15px" }}
            rows={blogs}
            rowHeight={80}
            columns={columns}
            loading={loading}
          />
        </Box>
      </Paper>
    </>
  );
};
