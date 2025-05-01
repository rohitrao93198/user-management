// src/components/Sidebar.jsx
import { Box, List, ListItem, ListItemText } from "@mui/material";

function Sidebar() {
    const pages = ["My Profile", "Company", "Employees", "Admins", "Departments"];

    return (
        <Box
            sx={{
                width: 200,
                height: "100vh",
                bgcolor: "#f5f5f5",
                paddingTop: 2,
                position: "fixed",
                left: 0,
                top: 0,
                borderRight: "1px solid #ddd",
            }}
        >
            <List>
                {pages.map((page, index) => (
                    <ListItem button key={index}>
                        <ListItemText primary={page} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default Sidebar;
