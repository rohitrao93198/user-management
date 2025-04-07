import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Typography, Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const SuperAdminDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <Box sx={{ display: "flex" }}>
            <Navbar />
            <Sidebar />
            <Container maxWidth="md" sx={{ marginTop: "200px", marginLeft: "240px" }}>
                <Typography variant="h4" gutterBottom>Super Admin Dashboard</Typography>
                <Typography variant="h6">Welcome, {user?.userName}!</Typography>
                <Typography variant="body1">Email: {user?.email}</Typography>
            </Container>
        </Box>
    );
};

export default SuperAdminDashboard;
