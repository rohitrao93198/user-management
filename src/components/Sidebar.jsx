import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Box,
    Typography,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

const Sidebar = () => {
    const { user, selectedMenuItem, handleMenuSelect } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/dashboard') {
            navigate('/profile');
        }
    }, [location.pathname, navigate]);

    const getMenuItems = () => {
        const baseItems = [
            { text: "My Profile", path: "/profile", icon: <PersonIcon /> },
        ];

        if (user?.roleType === 'SUPER_ADMIN') {
            baseItems.push(
                { text: "Company", path: "/company", icon: <BusinessIcon /> },
                { text: "Users", path: "/users", icon: <GroupIcon /> },
                { text: "Departments", path: "/departments", icon: <AccountTreeIcon /> },
                { text: "Sub Departments", path: "/subdepartments", icon: <SubdirectoryArrowRightIcon /> }
            );
        } else if (user?.roleType === 'ADMIN') {
            baseItems.push(
                { text: "Users", path: "/users", icon: <GroupIcon /> },
                { text: "Departments", path: "/departments", icon: <AccountTreeIcon /> },
                { text: "Sub Departments", path: "/subdepartments", icon: <SubdirectoryArrowRightIcon /> }
            );
        } else {
            baseItems.push(
                { text: "Users", path: "/users", icon: <GroupIcon /> }
            );
        }

        return baseItems;
    };

    const menuItems = getMenuItems();

    const handleItemClick = (path, text) => {
        handleMenuSelect(text.toLowerCase());
        navigate(path);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    backgroundColor: '#1a237e',
                    color: 'white',
                }
            }}
        >
            <Box sx={{ overflow: 'auto', mt: 8 }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            key={item.text}
                            component={Link}
                            to={item.path}
                            selected={selectedMenuItem === item.text.toLowerCase()}
                            onClick={() => handleItemClick(item.path, item.text)}
                            sx={{
                                py: 1.5,
                                '&:hover': {
                                    backgroundColor: '#283593',
                                },
                                '&.active': {
                                    backgroundColor: '#283593',
                                },
                                textDecoration: 'none',
                                color: 'inherit',
                                mb: 1,
                            }}
                        >
                            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {item.text}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
