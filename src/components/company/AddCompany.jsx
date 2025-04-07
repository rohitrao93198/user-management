import React, { useState } from 'react';
import { useCompany } from '../../context/CompanyContext';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
    Input
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const AddCompany = () => {
    const navigate = useNavigate();
    const { createCompany } = useCompany();
    const [formData, setFormData] = useState({
        name: '',
        address: ''
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                setError('Please upload a valid image file (JPEG, PNG, or GIF)');
                return;
            }

            setProfilePicture(file);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!profilePicture) {
            setError('Please select a profile picture');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await createCompany(formData, profilePicture);
            navigate('/company');
        } catch (err) {
            setError(err.message || 'Failed to create company');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '240px', mt: '64px' }}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h5" sx={{ mb: 3, color: '#1a237e', fontWeight: 600 }}>
                    Add New Company
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 3 }}>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            sx={{ display: 'none' }}
                            id="profile-picture-input"
                        />
                        <label htmlFor="profile-picture-input">
                            <Button
                                component="span"
                                variant="outlined"
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload Profile Picture
                            </Button>
                        </label>
                        {profilePicture && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                Selected file: {profilePicture.name}
                            </Typography>
                        )}
                    </Box>

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
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create Company'}
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

export default AddCompany;