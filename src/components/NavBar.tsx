import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [signInCount, setSignInCount] = useState<number>(0);

  useEffect(() => {
    // Retrieve the user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("googleUser") || "{}");
    if (storedUser) {
      setUserName(storedUser.name);
    }

    // Retrieve the sign-in history and count the number of sign-ins
    const signInHistory = JSON.parse(
      localStorage.getItem("signInHistory") || "[]"
    );
    setSignInCount(signInHistory.length);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#3f51b5",
        padding: "10px 20px",
        color: "white",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          sx={{
            color: "white",
            marginRight: "10px",
          }}
        >
          <AccountCircleIcon />
        </IconButton>
        <Typography variant="h6">{userName || "Guest"}</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography sx={{ marginRight: "10px" }}>
          Sign-ins: {signInCount}
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
