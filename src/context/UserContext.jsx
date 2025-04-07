import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://192.168.12.43:8080/ems/api/get/all/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (data.responseCode === 200 && data.data) {
                setUsers(data.data);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const uploadProfilePicture = async (file) => {
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://192.168.12.43:8080/ems/api/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                if (data.responseCode === 200) {
                    return { success: true, profileUrl: data.data };
                }
                throw new Error(data.message || 'Failed to upload profile picture');
            } else {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error('Server response was not in the expected format');
            }
        } catch (error) {
            console.error('Upload error:', error);
            throw new Error('Failed to upload profile picture: ' + error.message);
        }
    };

    const addUser = async (userData, profilePicture) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token not found');
            }

            let profileUrl = "http://localhost:8084/download/default.png";
            if (profilePicture) {
                const uploadResult = await uploadProfilePicture(profilePicture);
                if (uploadResult.success) {
                    profileUrl = uploadResult.profileUrl;
                }
            }

            const requestData = {
                name: userData.name,
                email: userData.email,
                logoUrl: profileUrl,
                role: userData.role,
                companyId: (userData.companyId), //
                presentAddress: userData.presentAddress,
                permanentAddress: userData.permanentAddress,
                departmentId: (userData.departmentId),//
                subDepartmentId: (userData.subDepartmentId),//
                cityId: (userData.cityId),// 
                stateId: parseInt(userData.stateId),
                phoneNumber: userData.phoneNumber
            };

            const response = await fetch('http://192.168.12.43:8080/ems/api/user/registration', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create user');
            }

            const data = await response.json();
            if (data.responseCode === 200) {
                await fetchUsers();
                return data;
            }
            throw new Error(data.message || 'Failed to create user');
        } catch (error) {
            console.error('Error creating user:', error);
            setError(error.message);
            throw error;
        }
    };

    const updateUser = async (userId, userData) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authentication token not found');
            }

            const requestData = {
                name: userData.name,
                email: userData.email,
                phoneNumber: userData.phoneNumber
            };

            const response = await fetch(`http://192.168.12.43:8080/ems/api/update/${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `Failed to update user (${response.status})`);
            }

            const data = await response.json();
            if (data.responseCode === 200) {
                await fetchUsers();
                return data;
            }
            throw new Error(data.message || 'Failed to update user');
        } catch (error) {
            console.error('Error updating user:', error);
            setError(error.message);
            throw error;
        }
    };

    return (
        <UserContext.Provider value={{
            users,
            loading,
            error,
            addUser,
            updateUser,
            fetchUsers,
            uploadProfilePicture
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;