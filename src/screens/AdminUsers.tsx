import { FC, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { UserType } from "../services/types";
import { getUsers } from "../services/firebase";

export const AdminUsers: FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users.filter((user) => user.role === "user"));
      setLoading(false);
    });
  }, []);

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
    },
    {
      field: "role",
      headerName: "Role",
      width: 260,
    },
  ];

  return (
    <Paper>
      <Box
        sx={{
          height: "85vh",
        }}
      >
        <DataGrid
          style={{ padding: "15px" }}
          rows={users}
          columns={columns}
          loading={loading}
        />
      </Box>
    </Paper>
  );
};
