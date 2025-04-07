import React, { useState, useEffect } from 'react';
import { useDepartment } from '../../context/DepartmentContext';
import { useCompany } from '../../context/CompanyContext';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress
} from '@mui/material';

const EditDepartment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { departments, updateDepartment } = useDepartment();
    const { companies, loading: companiesLoading } = useCompany();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        companyDto: {
            id: ''
        },
        isActive: true
    });

    useEffect(() => {
        const department = departments.find(d => d.id === parseInt(id));
        if (department) {
            setFormData({
                id: department.id,
                name: department.name,
                companyDto: {
                    id: department.companyDto.id
                },
                isActive: department.isActive
            });
        }
    }, [id, departments]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await updateDepartment(formData);
            if (result.success) {
                navigate('/departments');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '240px', mt: '64px' }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ mb: 3, color: '#1a237e', fontWeight: 600 }}>
                    Edit Department
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Department Name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel>Company</InputLabel>
                        <Select
                            value={formData.companyDto.id}
                            label="Company"
                            onChange={(e) => setFormData({
                                ...formData,
                                companyDto: { id: e.target.value }
                            })}
                            required
                            disabled={companiesLoading}
                        >
                            {companiesLoading ? (
                                <MenuItem disabled>
                                    <CircularProgress size={20} />
                                </MenuItem>
                            ) : (
                                companies.map((company) => (
                                    <MenuItem key={company.id} value={company.id}>
                                        {company.name}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ backgroundColor: '#1a237e' }}
                        >
                            Update Department
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/departments')}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default EditDepartment;