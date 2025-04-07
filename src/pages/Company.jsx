import React from "react";
import { useCompany } from "../context/CompanyContext";
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
    Button,
    IconButton
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const tableStyles = {
    position: 'relative',
    maxHeight: '75vh', // Adjust height as needed
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

const Company = () => {
    const { companies, loading, error } = useCompany();
    const navigate = useNavigate();

    const handleEdit = (company) => {
        console.log('Edit company:', company);
    };

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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" sx={{ color: '#1a237e', fontWeight: 600 }}>
                        Companies
                    </Typography>
                    <Button
                        onClick={() => navigate('/company/add')}
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{
                            backgroundColor: '#1a237e',
                            '&:hover': { backgroundColor: '#283593' }
                        }}
                    >
                        Add New Company
                    </Button>
                </Box>

                <TableContainer sx={tableStyles}>
                    <Table stickyHeader sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>S.No</TableCell>
                                <TableCell sx={{ fontWeight: 600, backgroundColor: '#f5f5f5' }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Created At</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Updated At</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companies.map((company, index) => (
                                <TableRow
                                    key={company.id}
                                    sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{company.id}</TableCell>
                                    <TableCell>{company.name}</TableCell>
                                    <TableCell>
                                        {new Date(company.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {company.updatedAt
                                            ? new Date(company.updatedAt).toLocaleDateString()
                                            : 'Not Updated'}
                                    </TableCell>
                                    <TableCell>{company.address}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={company.active ? 'Active' : 'Inactive'}
                                            color={company.active ? 'success' : 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            onClick={() => navigate(`/company/edit/${company.id}`)}
                                            sx={{ mr: 1, color: '#1a237e' }}
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

export default Company;