import { Navigate, Outlet } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../hooks/user-auth";
import { CenterBox } from "../components";


const PrivateRoute = ({ routeRole }: any) => {
  const auth = useAuth();

  if (auth?.user && auth.fireStoreUser?.role) {
    if (auth.fireStoreUser.role === routeRole) {
      return <Outlet />;
    } else {
      return <Navigate to='/' />;
    }
  } else {
    return (
      <CenterBox>
        <CircularProgress />
      </CenterBox>
    );
  }
};

export default PrivateRoute;
