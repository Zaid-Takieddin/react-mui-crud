import { Box, Button, Typography } from "@mui/material";
import React from "react";
// import { redirect } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const Navbar = () => {
  const user = useAuth();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "50px",
        backgroundColor: "#2f2f2f",
        position: "sticky",
        left: "0",
        top: "0",
        zIndex: "100",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.26)",
        padding: "0 10%",
      }}
    >
      <Typography sx={{ color: "white", fontWeight: "700" }}>
        React CRUD
      </Typography>
      {user && (
        <Button variant="outlined" onClick={user.logout}>
          Log Out
        </Button>
      )}
    </Box>
  );
};

export default Navbar;
