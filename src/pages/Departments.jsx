import React from "react";
import { useDepartment } from "../context/DepartmentContext";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Paper,
    Typography,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Button
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

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

const Departments = () => {
    const { departments, loading, error } = useDepartment();
    const navigate = useNavigate();

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
                <Typography>{error}</Typography>
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
                        Departments ({departments.length})
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/department/add')}
                        sx={{
                            backgroundColor: '#1a237e',
                            '&:hover': { backgroundColor: '#283593' }
                        }}
                    >
                        Add New Department
                    </Button>
                </Box>

                <TableContainer sx={tableStyles}>
                    <Table stickyHeader sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>S.No</TableCell>
                                <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Created At</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Updated At</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {departments.map((department, index) => (
                                <TableRow
                                    key={department.id}
                                    sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{department.id}</TableCell>
                                    <TableCell sx={{ fontWeight: 500 }}>{department.name}</TableCell>
                                    <TableCell>{department.companyDto?.name || 'N/A'}</TableCell>
                                    <TableCell>
                                        {new Date(department.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        {department.updatedAt
                                            ? new Date(department.updatedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })
                                            : 'Not Updated'}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={department.isActive ? 'Active' : 'Inactive'}
                                            color={department.isActive ? 'success' : 'default'}
                                            size="small"
                                            sx={{ minWidth: 75 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            sx={{ mr: 1, color: '#1a237e' }}
                                            onClick={() => navigate(`/department/edit/${department.id}`)}
                                        >
                                            Edit
                                        </Button>
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

export default Departments;

