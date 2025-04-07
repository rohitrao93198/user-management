import React, { useState, useEffect } from 'react';
import { useCompany } from '../../context/CompanyContext';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Alert
} from '@mui/material';

const EditCompany = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { companies, updateCompany } = useCompany();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        address: ''
    });

    useEffect(() => {
        const company = companies.find(c => c.id === parseInt(id));
        if (company) {
            setFormData({
                id: company.id,
                name: company.name,
                address: company.address
            });
        }
    }, [id, companies]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await updateCompany(formData);
            if (result.success) {
                navigate('/company');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '240px', mt: '64px' }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ mb: 3, color: '#1a237e', fontWeight: 600 }}>
                    Edit Company
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Company Name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Address"
                        name="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                        sx={{ mb: 3 }}
                    />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ backgroundColor: '#1a237e' }}
                        >
                            Update Company
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/company')}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default EditCompany;
