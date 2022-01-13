import { FC, useEffect, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Avatar, Box, Button, Paper, Switch, Typography } from "@mui/material";
import {
  Check as CheckIcon,
  ErrorOutline as ErrorOutlineIcon,
} from "@mui/icons-material";

import { UserType } from "../services/types";
import { getUsers } from "../services/firebase";

export const AdminUsers: FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);
  console.log(users);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 250,
      renderCell: (params) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar alt={params.row.userId} src={params.row.avatar} />
            <Typography variant="body2" sx={{ px: [2] }}>
              {params.row.name}
            </Typography>
          </Box>
        );
      },
    },
    { field: "email", headerName: "E-mail", width: 250 },
    {
      field: "status",
      headerName: "Status",
      width: 260,
      align: "center",
      renderCell: (params) => {
        const user = params.row;

        // const handleChange = async () => {
        //   await updateUser(user.uid, user.status)

        //   if (user.status) {
        //     enqueueSnackbar(`${user.name} is suspended`, { variant: "error" });
        //   } else {
        //     enqueueSnackbar(`${user.name} is active`, { variant: "success" });
        //   }
        // };

        return (
          <>
            <Button
              sx={{
                width: "75%",
                textTransform: "none",
                borderRadius: "5px",
                backgroundColor: user.status ? "#E5FFEA" : "#FFE2E2",
                color: user.status ? "#16C138" : "#D41E1E",
                "&:hover": {
                  backgroundColor: user.status ? "#E5FFEA" : "#FFE2E2",
                },
              }}
              startIcon={user.status ? <CheckIcon /> : <ErrorOutlineIcon />}
              endIcon={
                <Switch
                  size="small"
                  sx={{ color: "#16C138" }}
                  checked={user.status}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              // onClick={handleChange}
            >
              {user.status ? "Active" : "Suspended"}
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <Paper>
      <Box
        sx={{
          height: "85vh",
        }}
      >
        <DataGrid style={{ padding: "15px" }} rows={users} columns={columns} />
      </Box>
    </Paper>
  );
};
