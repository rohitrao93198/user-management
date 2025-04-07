import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Stack,
    CircularProgress
} from '@mui/material';
import { UserContext } from '../../context/UserContext';

const EditUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { users, updateUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    });

    useEffect(() => {
        const user = users.find(u => u.userId === userId);
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber || ''
            });
        }
    }, [userId, users]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUser(userId, formData);
            navigate('/users');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 3, ml: '240px', mt: '64px' }}>
            <Paper elevation={0} sx={{ p: 4, maxWidth: '600px', margin: 'auto' }}>
                <Typography variant="h5" sx={{ mb: 4, color: '#1a237e', fontWeight: 600, textAlign: 'center' }}>
                    Edit User
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            label="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        // disabled
                        />

                        <TextField
                            fullWidth
                            label="Phone Number"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            required
                            placeholder="+91"
                        />

                        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                fullWidth
                            >
                                {loading ? <CircularProgress size={24} /> : 'Update'}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/users')}
                                fullWidth
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
};

export default EditUser;