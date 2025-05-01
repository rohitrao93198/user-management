// src/components/Dashboard/SuperAdminDashboard.jsx
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

function SuperAdminDashboard() {
    const { state } = useLocation();
    const userData = state || JSON.parse(localStorage.getItem("currentUser"));

    const { userName, email } = userData || {};

    return (
        <Box>
            <Navbar />
            <Sidebar />
            <Box sx={{ marginLeft: "220px", p: 4 }}>
                <Typography variant="h4">Super Admin Dashboard</Typography>
                <Typography variant="body1">Welcome, {userName} ({email})</Typography>
            </Box>
        </Box>
    );
}

export default SuperAdminDashboard;
