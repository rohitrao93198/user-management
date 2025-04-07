import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    Button,
    CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const tableStyles = {
    position: 'relative',
    maxHeight: '75vh',
    overflow: 'auto',
    '& thead': {
        position: 'sticky',
        top: 0,
        backgroundColor: '#f5f5f5',
        zIndex: 1,
    },
    '& thead th': {
        backgroundColor: '#f5f5f5',
    }
};

const Users = () => {
    const { users, loading, error } = useContext(UserContext);
    const { user: currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddNew = () => {
        if (currentUser.roleType === 'SUPER_ADMIN' || currentUser.roleType === 'ADMIN') {
            navigate('/users/add');
        }
    };

    const canEditUser = (targetUser) => {
        if (!currentUser) return false;

        if (currentUser.roleType === 'USER') {
            return currentUser.email === targetUser.email;
        }

        if (currentUser.roleType === 'ADMIN') {
            return currentUser.email === targetUser.email || targetUser.role === 'USER';
        }

        if (currentUser.roleType === 'SUPER_ADMIN') {
            if (currentUser.email === targetUser.email) return true;
            return targetUser.role !== 'SUPER_ADMIN';
        }

        return false;
    };

    const handleEdit = (userId) => {
        const targetUser = users.find(u => u.userId === userId);
        if (!targetUser) return;

        if (currentUser.roleType === 'USER') {
            if (currentUser.email === targetUser.email) {
                navigate(`/users/edit/${userId}`);
            }
        }
        else if (currentUser.roleType === 'ADMIN') {
            if (currentUser.email === targetUser.email || targetUser.role === 'USER') {
                navigate(`/users/edit/${userId}`);
            }
        }
        else if (currentUser.roleType === 'SUPER_ADMIN') {
            if (currentUser.email === targetUser.email || targetUser.role !== 'SUPER_ADMIN') {
                navigate(`/users/edit/${userId}`);
            }
        }
    };

    useEffect(() => {
        console.log('Users Component Mounted');
        console.log('Current Users State:', {
            usersLength: users?.length,
            users,
            loading,
            error
        });
    }, [users, loading, error]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3, color: 'error.main' }}>
                Error: {error}
            </Box>
        );
    }

    if (!users || users.length === 0) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>No users found</Typography>
            </Box>
        );
    }

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 0,
                ml: '240px',
                mt: '56px',
                backgroundColor: '#f5f5f5',
                minHeight: 'calc(100vh - 64px)',
            }}
        >
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                }}>
                    <Typography variant="h5" sx={{ color: '#1a237e', fontWeight: 600 }}>
                        All Users ({users.length})
                    </Typography>
                    {(currentUser?.roleType === 'SUPER_ADMIN' || currentUser?.roleType === 'ADMIN') && (
                        <Box>
                            <Button
                                onClick={handleAddNew}
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{
                                    backgroundColor: '#1a237e',
                                    '&:hover': { backgroundColor: '#283593' }
                                }}
                            >
                                Add New User
                            </Button>
                        </Box>
                    )}
                </Box>

                <TableContainer sx={tableStyles}>
                    <Table stickyHeader sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>S.No</TableCell>
                                <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Role Type</TableCell>
                                <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Company</TableCell>
                                <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Department</TableCell>
                                <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>State</TableCell>
                                <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>City</TableCell>
                                <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Id</TableCell>
                                <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow
                                    key={user.userId || user.email}
                                    sx={{
                                        backgroundColor:
                                            user.role === 'SUPER_ADMIN' ? '#e8eaf6' :
                                                user.role === 'ADMIN' ? '#f3e5f5' :
                                                    'inherit'
                                    }}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.company || '-'}</TableCell>
                                    <TableCell>{user.department || '-'}</TableCell>
                                    <TableCell>{user.stateName || '-'}</TableCell>
                                    <TableCell>{user.cityName || '-'}</TableCell>
                                    <TableCell>{user.userId || '-'}</TableCell>
                                    <TableCell>
                                        {canEditUser(user) && (
                                            <Button
                                                onClick={() => handleEdit(user.userId)}
                                                size="small"
                                                sx={{ mr: 1, color: '#1a237e' }}
                                            >
                                                Edit
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default Users;
