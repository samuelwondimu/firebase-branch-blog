import { FC, MouseEvent, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Link, Outlet, useNavigate } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import CreateIcon from "@mui/icons-material/Create";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useAuth } from "../hooks/user-auth";
import {
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
} from "@mui/material";
import { Home, LogoutOutlined } from "@mui/icons-material";

const drawerWidth = 240;

export const DashboardLayout: FC = () => {
  const auth = useAuth();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settingsAdmin = [
    {
      name: "Dashboard",
      to: "/admin/dashboard",
      icon: <DashboardIcon fontSize="small" />,
    },
    {
      name: "Admin Blogs",
      to: "/admin/blogs",
      icon: <ChromeReaderModeIcon fontSize="small" />,
    },
    {
      name: "Users",
      to: "/admin/users",
      icon: <PeopleIcon fontSize="small" />,
    },
    {
      name: "Bloggers",
      to: "/admin/bloggers",
      icon: <CreateIcon fontSize="small" />,
    },
  ];

  const settingsBloggers = [
    {
      name: "Create Blog",
      to: "/blogger/create-blog",
      icon: <CreateIcon fontSize="small" />,
    },
    {
      name: "My Blogs",
      to: "/blogger/my-blogs",
      icon: <ChromeReaderModeIcon fontSize="small" />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        elevation={0}
      >
        <Paper
          elevation={0}
          sx={{ borderRadius: 0, borderBottom: "1px solid #3333" }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" noWrap component="div">
                Blog CMS
              </Typography>
            </Box>

            {auth?.user && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={`${auth.user.photoURL}`} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <Box alignItems={"center"}>
                    <MenuItem>
                      <Avatar src={`${auth?.user?.photoURL}`} />{" "}
                      <Typography color="GrayText">
                        <b>{auth?.user?.displayName}</b> <br />
                        {auth?.user?.email}
                      </Typography>
                    </MenuItem>

                    <Divider />
                    <MenuItem component={Link} to={"/"}>
                      <ListItemIcon>
                        <Home />
                      </ListItemIcon>
                      Home
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        auth?.signout().then(() => {
                          navigate("/");
                        });
                      }}
                    >
                      <ListItemIcon>
                        <LogoutOutlined fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Box>
                </Menu>
              </>
            )}
          </Toolbar>
        </Paper>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          borderRight: "1px solid #333",
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {auth?.fireStoreUser?.role === "admin" &&
            settingsAdmin.map((setting) => (
              <ListItem
                button
                key={setting.to}
                component={Link}
                to={setting.to}
              >
                <ListItemIcon>{setting.icon}</ListItemIcon>
                {setting.name}
              </ListItem>
            ))}
          {auth?.fireStoreUser?.role === "blogger" &&
            settingsBloggers.map((setting) => (
              <ListItem
                button
                key={setting.to}
                component={Link}
                to={setting.to}
              >
                <ListItemIcon>{setting.icon}</ListItemIcon>
                {setting.name}
              </ListItem>
            ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#e2e2e2", minHeight: "100vh", p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
