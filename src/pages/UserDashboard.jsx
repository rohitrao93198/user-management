import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const UserDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <Box sx={{ display: "flex" }}>
            <Navbar />
            <Sidebar />

        </Box>
    );
};

export default UserDashboard;
