import { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { CenterBox } from ".";

export const LoadingIndicator: FC = () => (
  <CenterBox>
    <CircularProgress />
  </CenterBox>
);
