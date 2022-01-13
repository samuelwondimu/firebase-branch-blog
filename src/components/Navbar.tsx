import { FC, useState, MouseEvent } from "react";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Toolbar,
  Button,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import CreateIcon from "@mui/icons-material/Create";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/user-auth";
import { Logout } from "@mui/icons-material";

export const Navbar: FC = () => {
  const auth = useAuth();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const setttingsAdmin = [
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
  const settingsBloggers = [
    { name: "Create Blog", to: "/blogger/create-blog", icon: <CreateIcon /> },
    {
      name: "My Blogs",
      to: "/blogger/my-blogs",
      icon: <ChromeReaderModeIcon />,
    },
  ];

  return (
    <nav>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Button component={Link} to="/" sx={{ color: "white" }}>
                BLOG-CMS
              </Button>
            </Box>

            {auth?.user ? (
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
                        samuelwondimuwy@gmail.com
                      </Typography>
                    </MenuItem>
                    <Divider />

                    {setttingsAdmin.map((setting) => (
                      <MenuItem
                        key={setting.to}
                        component={Link}
                        to={setting.to}
                        onClick={handleCloseUserMenu}
                      >
                        <ListItemIcon>{setting.icon}</ListItemIcon>
                        {setting.name}
                      </MenuItem>
                    ))}
                    <MenuItem onClick={() => auth?.signout()}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Box>
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/signin">
                  Sign In
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Sign Up
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Box p={2} sx={{ backgroundColor: "#e2e2e2" }}>
        <Outlet />
      </Box>
    </nav>
  );
};
