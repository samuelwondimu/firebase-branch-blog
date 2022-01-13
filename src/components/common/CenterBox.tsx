import React from "react";

import { Box } from "@mui/material";

export const CenterBox: React.FC = ({ children }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width="100%"
      height="85vh"
    >
      {children}
    </Box>
  );
};