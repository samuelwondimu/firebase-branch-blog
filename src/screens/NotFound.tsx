import { Button, Typography } from "@mui/material";
import { FC } from "react";
import FourOFour from "../assets/FourOFour.png";
import { CenterBox } from "../components";

export const NotFound: FC = () => {
  return (
    <>
      <CenterBox>
        <img alt={"not found"} src={FourOFour} style={{ height: 300 }} />
        <Typography
          sx={{ py: 4 }}
          fontWeight={"bold"}
          variant="h6"
          textAlign={"center"}
        >
          The Page you're looking for can't be found <br /> or You don't have
          access redirect to the Home page
        </Typography>
        <Button variant="contained">Back to Home</Button>
      </CenterBox>
    </>
  );
};
