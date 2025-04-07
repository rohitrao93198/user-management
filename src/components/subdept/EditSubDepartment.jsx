import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
    Alert,
    CircularProgress
} from '@mui/material';
import { useSubDepartment } from '../../context/SubDepartmentContext';
import { CompanyContext } from '../../context/CompanyContext';
import { DepartmentContext } from '../../context/DepartmentContext';

const EditSubDepartment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { subDepartments, updateSubDepartment } = useSubDepartment();
    const { companies } = useContext(CompanyContext);
    const { departments } = useContext(DepartmentContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        departmentDto: { id: '' },
        companyDto: { id: '' }
    });

    useEffect(() => {
        const subDept = subDepartments.find(dept => dept.id === parseInt(id));
        if (subDept) {
            setFormData({
                id: subDept.id,
                name: subDept.name,
                departmentDto: { id: subDept.departmentDto?.id || '' },
                companyDto: { id: subDept.companyDto?.id || '' }
            });
        }
    }, [id, subDepartments]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await updateSubDepartment(formData);
            navigate('/subdepartments');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3, ml: '240px', mt: '64px' }}>
            <Paper elevation={0} sx={{ p: 4, maxWidth: '600px', margin: 'auto' }}>
                <Typography variant="h5" sx={{ mb: 4, color: '#1a237e', fontWeight: 600 }}>
                    Edit Sub-Department
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Sub-Department Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        sx={{ mb: 3 }}
                    />

                    <TextField
                        select
                        fullWidth
                        label="Company"
                        value={formData.companyDto.id}
                        onChange={(e) => setFormData({
                            ...formData,
                            companyDto: { id: e.target.value }
                        })}
                        required
                        sx={{ mb: 3 }}
                    >
                        {companies.map((company) => (
                            <MenuItem key={company.id} value={company.id}>
                                {company.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        fullWidth
                        label="Department"
                        value={formData.departmentDto.id}
                        onChange={(e) => setFormData({
                            ...formData,
                            departmentDto: { id: e.target.value }
                        })}
                        required
                        sx={{ mb: 3 }}
                    >
                        {departments.map((dept) => (
                            <MenuItem key={dept.id} value={dept.id}>
                                {dept.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                bgcolor: '#1a237e',
                                '&:hover': { bgcolor: '#283593' }
                            }}
                        >
                            {loading ? <CircularProgress size={24} /> : 'Update'}
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/subdepartments')}
                            sx={{
                                color: '#1a237e',
                                borderColor: '#1a237e'
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default EditSubDepartment;