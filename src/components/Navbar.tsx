import { FC } from "react";
import { AppBar, Avatar, Box, Toolbar, Typography, Button } from "@mui/material";

export const Navbar: FC = () => {
  return (
    <nav>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blog
            </Typography>
            <Button color="inherit">Sign In</Button>
            <Button color="inherit">Sign Up</Button>
            <Avatar alt="Remy Sharp" src="samuel wondimu" />
          </Toolbar>
        </AppBar>
      </Box>
    </nav>
  );
};
