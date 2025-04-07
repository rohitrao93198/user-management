import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Stack,
    MenuItem,
    CircularProgress
} from '@mui/material';
import { UserContext } from '../../context/UserContext';
import { CompanyContext } from '../../context/CompanyContext';
import { DepartmentContext } from '../../context/DepartmentContext';
import { SubDepartmentContext } from '../../context/SubDepartmentContext';
import { LocationContext } from '../../context/LocationContext';
import { AuthContext } from '../../context/AuthContext';
import UploadIcon from '@mui/icons-material/Upload';

const AddUser = () => {
    const navigate = useNavigate();
    const { addUser } = useContext(UserContext);
    const { companies } = useContext(CompanyContext);
    const { departments } = useContext(DepartmentContext);
    const { subDepartments } = useContext(SubDepartmentContext);
    const { states, cities, fetchCitiesByState } = useContext(LocationContext);
    const { user: currentUser } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        logoUrl: '',
        role: currentUser?.roleType === 'ADMIN' ? 'USER' : '',
        companyId: '',
        presentAddress: '',
        permanentAddress: '',
        departmentId: '',
        subDepartmentId: '',
        stateId: '',
        cityId: '',
        phoneNumber: ''
    });

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            try {
                const uploadResult = await uploadProfilePicture(file);
                if (uploadResult.success) {
                    setFormData(prev => ({ ...prev, logoUrl: uploadResult.profileUrl }));
                }
            } catch (error) {
                setError('Error uploading image: ' + error.message);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addUser(formData, selectedFile);
            navigate('/users');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getRoleOptions = () => {
        if (currentUser?.roleType === 'SUPER_ADMIN') {
            return [
                <MenuItem key="USER" value="USER">User</MenuItem>,
                <MenuItem key="ADMIN" value="ADMIN">Admin</MenuItem>
            ];
        }
        return [
            <MenuItem key="USER" value="USER">User</MenuItem>
        ];
    };

    return (
        <Box sx={{ p: 3, ml: '240px', mt: '64px' }}>
            <Paper elevation={0} sx={{ p: 4, maxWidth: '600px', margin: 'auto' }}>
                <Typography variant="h5" sx={{ mb: 4, color: '#1a237e', fontWeight: 600, textAlign: 'center' }}>
                    Add New User
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<UploadIcon />}
                            sx={{ color: '#1a237e', borderColor: '#1a237e' }}
                        >
                            Upload Profile Picture
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageUpload}
                                name="file"
                            />
                        </Button>

                        <Typography variant="subtitle1" sx={{ color: '#1a237e', fontWeight: 500 }}>
                            Basic Information
                        </Typography>

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
                        />

                        <TextField
                            select
                            fullWidth
                            label="Role"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            required
                        >
                            {getRoleOptions()}
                        </TextField>

                        <Typography variant="subtitle1" sx={{ color: '#1a237e', fontWeight: 500, mt: 2 }}>
                            Organization Details
                        </Typography>

                        <TextField
                            select
                            fullWidth
                            label="Company"
                            value={formData.companyId}
                            onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                            required
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
                            value={formData.departmentId}
                            onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                            required
                        >
                            {departments.map((dept) => (
                                <MenuItem key={dept.id} value={dept.id}>
                                    {dept.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            fullWidth
                            label="Sub Department"
                            value={formData.subDepartmentId}
                            onChange={(e) => setFormData({ ...formData, subDepartmentId: e.target.value })}
                            required
                        >
                            {subDepartments.map((subDept) => (
                                <MenuItem key={subDept.id} value={subDept.id}>
                                    {subDept.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Typography variant="subtitle1" sx={{ color: '#1a237e', fontWeight: 500, mt: 2 }}>
                            Location Details
                        </Typography>

                        <TextField
                            select
                            fullWidth
                            label="State"
                            value={formData.stateId}
                            onChange={(e) => {
                                setFormData({ ...formData, stateId: e.target.value, cityId: '' });
                                fetchCitiesByState(e.target.value);
                            }}
                            required
                        >
                            {states.map((state) => (
                                <MenuItem key={state.id} value={state.id}>
                                    {state.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            fullWidth
                            label="City"
                            value={formData.cityId}
                            onChange={(e) => setFormData({ ...formData, cityId: e.target.value })}
                            required
                            disabled={!formData.stateId}
                        >
                            {cities.map((city) => (
                                <MenuItem key={city.id} value={city.id}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <Typography variant="subtitle1" sx={{ color: '#1a237e', fontWeight: 500, mt: 2 }}>
                            Contact Details
                        </Typography>

                        <TextField
                            fullWidth
                            label="Present Address"
                            value={formData.presentAddress}
                            onChange={(e) => setFormData({ ...formData, presentAddress: e.target.value })}
                            required
                            multiline
                            rows={2}
                        />

                        <TextField
                            fullWidth
                            label="Permanent Address"
                            value={formData.permanentAddress}
                            onChange={(e) => setFormData({ ...formData, permanentAddress: e.target.value })}
                            required
                            multiline
                            rows={2}
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
                                sx={{
                                    backgroundColor: '#1a237e',
                                    '&:hover': { backgroundColor: '#283593' }
                                }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Save'}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => navigate('/users')}
                                fullWidth
                                sx={{
                                    color: '#1a237e',
                                    borderColor: '#1a237e',
                                    '&:hover': { borderColor: '#283593' }
                                }}
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

export default AddUser;