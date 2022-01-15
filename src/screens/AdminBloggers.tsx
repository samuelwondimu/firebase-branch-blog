import { FC, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { UserType } from "../services/types";
import { getUsers, promoteUser } from "../services/firebase";
import { SelectForm } from "../components";
import { useForm } from "react-hook-form";

export const AdminBloggers: FC = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [bloggers, setBloggers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>();

  const { control, handleSubmit } = useForm({ mode: "onChange" });

  // roles for the select form
  const roles = [{ value: "blogger", label: "Blogger" }];

  // promote user function
  async function onSubmit(data: any) {
    let userId = users.filter((user) => user.email === selectedUser)[0].id;
    if (data) {
      promoteUser(`${userId}`, data.role).then(() => {
        setOpen(false);
        setInputValue("");
      });
    }
  }

  function handleClose() {
    setOpen(false);
    setInputValue("");
  }

  function handleOpen() {
    setOpen(true);
  }

  const CustomToolbar = () => {
    return (
      <Button
        onClick={() => {
          handleOpen();
        }}
        variant="outlined"
      >
        Add Blogger
      </Button>
    );
  };

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users.filter((user) => user.role === "user"));
      setBloggers(users.filter((user) => user.role === "blogger"));
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
          rows={bloggers}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
          }}
          loading={loading}
          pageSize={12}
        />

        {/* modal for role change */}
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { sm: 300, md: 450 },
              bgcolor: "background.paper",
              borderRadius: "10px",
              boxShadow: 24,
              p: 5,
            }}
          >
            <Typography variant="h5">Add Blogger</Typography>
            <Box py={2}>
              <Divider />
            </Box>
            <Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                  <Typography>Select a User</Typography>
                  <Autocomplete
                    value={selectedUser}
                    onChange={(event: any, newValue: string | null) => {
                      setSelectedUser(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    id="controllable-states-demo"
                    options={users.map((user) => user.email)}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="search a user...." />
                    )}
                  />
                  <Typography>Select a Role</Typography>
                  <SelectForm
                    placeholder="select something"
                    control={control}
                    options={roles}
                    name={"role"}
                  />
                </Stack>

                <Box
                  pt={4}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button onClick={handleClose} sx={{ color: "#000" }}>
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit">
                    Confirm
                  </Button>
                </Box>
              </form>
            </Box>

            <Divider sx={{ mt: 4 }} />
          </Box>
        </Modal>
      </Box>
    </Paper>
  );
};
