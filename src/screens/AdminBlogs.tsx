import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { getBlogs } from "../services/firebase";
import { BlogType } from "../services/types";

export const AdminBlogs: FC = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    getBlogs().then((res) => {
      if (res) {
        setBlogs(res);
      }
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
            <Typography
              variant="body1"
              fontWeight="bold"
            >{`${blogTitle}`}</Typography>
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
        return (
          <Stack direction="row" spacing={2}>
            <Button variant="contained">publish</Button>
            <Button variant="contained">unPublish</Button>
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
          />
        </Box>
      </Paper>
    </>
  );
};
