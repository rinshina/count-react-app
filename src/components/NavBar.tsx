import React, { useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Define the props type for Navbar
interface NavbarProps {
  userName: string;
}

const Navbar: React.FC<NavbarProps> = ({ userName }) => {
  // const [signInCount, setSignInCount] = useState<number>(0);

  useEffect(() => {
    // Retrieve the sign-in history and count the number of sign-ins
    //const signInHistory = JSON.parse(
    //localStorage.getItem("signInHistory") || "[]"
    //);
    //setSignInCount(signInHistory.length); // Set the sign-in count
  }, []); // Only run on component mount

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between", // Make sure the content is spread across the navbar
        alignItems: "center",
        backgroundColor: "#3f51b5",
        padding: "10px 20px",
        color: "white",
      }}
    >
      {/* Left section */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          sx={{
            color: "white",
            marginRight: "10px",
          }}
        >
          <AccountCircleIcon />
        </IconButton>
        {/* Display userName or "Guest" if not found */}
        <Typography variant="h6">{userName || "Guest"}</Typography>
      </Box>

      {/* Right section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Center this section
          alignItems: "center",
          flex: 1, // Allow the content to grow and fill the available space
        }}
      ></Box>
    </Box>
  );
};

export default Navbar;
