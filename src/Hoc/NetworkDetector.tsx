import { FC, useEffect, useState } from "react";
import { useSnackbar } from "notistack";

export const NetworkDetector: FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isDisconnected, setIsDesconnected] = useState(false);

  const handleConnectionChange = () => {
    const condition = navigator.onLine ? "online" : "offline";
    if (condition === "online") {
      const webPing = setInterval(() => {
        fetch("//google.com", {
          mode: "no-cors",
        })
          .then(() => {
            setIsDesconnected(false);
            clearInterval(webPing);
          })
          .catch(() => setIsDesconnected(true));
      }, 2000);
      return;
    }
  };

  useEffect(() => {
    handleConnectionChange();
  }, []);

  return (
    <>
      {isDisconnected
        ? enqueueSnackbar("internet disconnected")
        : enqueueSnackbar("back online")}
      {children}
    </>
  );
};
