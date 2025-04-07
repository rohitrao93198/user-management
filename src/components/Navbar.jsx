import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { logout } = useContext(AuthContext);

    return (
        <AppBar
            position="fixed"
            sx={{
                zIndex: 1300,
                width: "100%",
            }}
        >
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">
                    <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                        User Management
                    </Link>
                </Typography>

                <Box>
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
