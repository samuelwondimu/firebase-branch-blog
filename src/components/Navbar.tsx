import { FC, useState, MouseEvent, useEffect } from "react";
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
  Paper,
  Container,
  PaperProps,
  Stack,
  ListItemText,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import CreateIcon from "@mui/icons-material/Create";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/user-auth";
import { ClearAll, Logout, Notifications } from "@mui/icons-material";
import { NotificationType } from "../services/types";
import { getNotifications } from "../services/firebase";

const menuPaperStyle: Partial<PaperProps<"div", {}>> | undefined = {
  elevation: 0,
  sx: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    maxWidth: 400,
    maxHeight: 600,
    overflowY: "scroll",
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
};

export const Navbar: FC = () => {
  const auth = useAuth();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNotification, setAnchorElNotification] =
    useState<null | HTMLElement>(null);

  const handleOpenNotificationMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setAnchorElNotification(null);
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  async function updateNotification() {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        seen: true,
      }))
    );
  }

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
  ];
  const settingsBloggers = [
    { name: "Create Blog", to: "/blogger/create-blog", icon: <CreateIcon /> },
    {
      name: "My Blogs",
      to: "/blogger/my-blogs",
      icon: <ChromeReaderModeIcon />,
    },
  ];

  useEffect(() => {
    getNotifications(`${auth?.user?.uid}`).then((notifications) => {
      setNotifications(
        notifications.filter(
          (notification) => notification.receiverId === `${auth?.user?.uid}`
        )
      );
    });
  }, [auth]);

  return (
    <nav>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={0}>
          <Paper
            elevation={0}
            sx={{ borderRadius: 0, borderBottom: "1px solid #d3d3d3" }}
          >
            <Container maxWidth={"xl"}>
              <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                  <Button component={Link} to="/" variant="contained">
                    BLOG-CMS
                  </Button>
                </Box>

                {auth?.user ? (
                  <>
                    <Tooltip title="Notification" sx={{ mr: 2 }}>
                      <IconButton
                        aria-label="notification"
                        onClick={handleOpenNotificationMenu}
                      >
                        <Notifications fontSize={"large"} />
                      </IconButton>
                    </Tooltip>

                    <Menu
                      open={Boolean(anchorElNotification)}
                      onClose={handleCloseNotificationMenu}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      anchorEl={anchorElNotification}
                      PaperProps={menuPaperStyle}
                      sx={{ mt: "45px" }}
                      id="notification-menu"
                    >
                      <Stack
                        direction={"row"}
                        sx={{
                          justifyContent: "space-between",
                          mx: 2,
                          alignItems: "center",
                        }}
                      >
                        <Typography>
                          {notifications.length} Notifications
                        </Typography>
                        <IconButton
                          aria-label="clear notification"
                          onClick={updateNotification}
                        >
                          <ClearAll />
                        </IconButton>
                      </Stack>
                      <Divider />

                      {notifications.map((notification, index) => {
                        return (
                          <Box
                            sx={{
                              px: 2,
                              m: 1,
                              borderRadius: 2,
                              py: 1,
                              backgroundColor: notification.seen
                                ? "whiteSmoke"
                                : "#ff9e92",
                            }}
                          >
                            <ListItemText>
                              {notification.notificationMessage}
                            </ListItemText>
                            <Typography>{`${notification.createdAt}`}</Typography>
                          </Box>
                        );
                      })}
                    </Menu>

                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="Remy Sharp"
                          src={`${auth.user.photoURL}`}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-avatar"
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
                      PaperProps={menuPaperStyle}
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

                        {auth.fireStoreUser?.role === "admin" &&
                          setttingsAdmin.map((setting) => (
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
                        {auth.fireStoreUser?.role === "blogger" &&
                          settingsBloggers.map((setting) => (
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
            </Container>
          </Paper>
        </AppBar>
      </Box>
      <Box p={2} sx={{ backgroundColor: "#f5f5f5", minHeight: "auto" }}>
        <Outlet />
      </Box>
    </nav>
  );
};
