import { FC } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, Outlet } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import CreateIcon from "@mui/icons-material/Create";
import DashboardIcon from "@mui/icons-material/Dashboard";

const drawerWidth = 240;

export const DashboardLayout: FC = () => {
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
      to: "/admin/create-blog",
      icon: <CreateIcon fontSize="small" />,
    },
    {
      name: "My Blogs",
      to: "/admin/my-blogs",
      icon: <ChromeReaderModeIcon fontSize="small" />,
    },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Blog CMS
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {setttingsAdmin.map((setting) => (
            <ListItem button key={setting.to} component={Link} to={setting.to}>
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
