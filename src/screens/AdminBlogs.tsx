import { FC, useEffect, useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";

import { getBlogs, updateBlog } from "../services/firebase";
import { BlogType } from "../services/types";

export const AdminBlogs: FC = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs().then((res) => {
      if (res) {
        setBlogs(res);
        setLoading(false);
      }
      // setLoading(false);
    });
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
      width: 150,
      headerName: "Likes",
      renderCell: (params) => {
        const { likes } = params.row;
        return <Typography>{likes.length}</Typography>;
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
    },
    {
      field: "id",
      width: 300,
      headerName: "actions",
      renderCell: (params) => {
        const { status, id } = params.row;

        async function unPublish() {
          setLoading(true);
          await updateBlog(id, status);
          // update the data grid after new change
          getBlogs().then((res) => {
            if (res) {
              setBlogs(res);
            }
          });
          setLoading(false);
        }

        async function publish() {
          setLoading(true);
          await updateBlog(id, status);
          // update the data grid after new change
          getBlogs().then((res) => {
            if (res) {
              setBlogs(res);
            }
          });
          setLoading(false);
        }

        return (
          <Stack direction="row" spacing={2}>
            {status ? (
              <Button variant="contained" color="warning" onClick={unPublish}>
                unPublish
              </Button>
            ) : (
              <Button variant="contained" color="success" onClick={publish}>
                publish
              </Button>
            )}
          </Stack>
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
