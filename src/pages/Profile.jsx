import React, { useContext, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import {
    Box,
    Paper,
    Typography,
    Avatar,
    Grid,
    CircularProgress,
    Divider
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const Profile = () => {
    const { user: authUser } = useContext(AuthContext);
    const { users, loading, error } = useContext(UserContext);

    const currentUser = useMemo(() => {
        return users?.find(user =>
            user.email === authUser?.email &&
            user.role === authUser?.roleType
        );
    }, [authUser, users]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !currentUser) {
        return (
            <Box sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
                <Typography>{error || 'User information not found'}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, ml: '240px', mt: '64px' }}>
            <Paper sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            bgcolor: '#1a237e',
                            mr: 2
                        }}
                    >
                        <PersonIcon sx={{ fontSize: 40 }} />
                    </Avatar>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 500 }}>
                            {currentUser?.name || 'N/A'}
                        </Typography>
                        <Typography color="textSecondary">
                            {currentUser?.role || 'N/A'}
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={4}>
                    <Grid gridsize={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                            Basic Information
                        </Typography>
                        <Box sx={{ '& > *': { mb: 2 } }}>
                            <InfoItem label="Email" value={currentUser?.email} />
                            <InfoItem label="User ID" value={currentUser?.userId} />
                            <InfoItem label="Phone" value={currentUser?.phoneNumber} />
                        </Box>
                    </Grid>

                    {/* <Grid item xs={12} sm={6}> */}
                    <Grid gridsize={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                            Organization Details
                        </Typography>
                        <Box sx={{ '& > *': { mb: 2 } }}>
                            <InfoItem label="Company" value={currentUser?.company} />
                            <InfoItem label="Department" value={currentUser?.department} />
                            <InfoItem label="Sub Department" value={currentUser?.subDepartment} />
                            <InfoItem label="Location" value={`${currentUser?.cityName || ''}, ${currentUser?.stateName || ''}`} />
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

const InfoItem = ({ label, value }) => (
    value ? (
        <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="textSecondary">
                {label}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {value}
            </Typography>
        </Box>
    ) : null
);

export default Profile;