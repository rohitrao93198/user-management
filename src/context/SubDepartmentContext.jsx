import React, { createContext, useState, useContext, useEffect } from 'react';

export const SubDepartmentContext = createContext();

export const SubDepartmentProvider = ({ children }) => {
    const [subDepartments, setSubDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchSubDepartments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://192.168.12.43:8080/ems/api/get/all/subDepartment', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (data.responseCode === 200) {
                setSubDepartments(data.data);
            } else {
                throw new Error(data.message || 'Failed to fetch sub-departments');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createSubDepartment = async (subDepartmentData) => {
        try {
            const token = localStorage.getItem('token');
            const requestData = {
                ...subDepartmentData,
                createdAt: new Date().toISOString(),
                updatedAt: null,
                createdBy: null
            };

            const response = await fetch('http://192.168.12.43:8080/ems/api/subDepartment/registration', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();
            if (data.responseCode === 200) {
                await fetchSubDepartments();
                return { success: true, message: data.message };
            } else {
                throw new Error(data.message || 'Failed to create sub-department');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const updateSubDepartment = async (subDepartmentData) => {
        try {
            const token = localStorage.getItem('token');
            const requestData = {
                ...subDepartmentData,
                updatedAt: new Date().toISOString()
            };

            const response = await fetch('http://192.168.12.43:8080/ems/api/subDepartment/registration', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            const data = await response.json();
            if (data.responseCode === 200) {
                await fetchSubDepartments();
                return { success: true, message: data.message };
            } else {
                throw new Error(data.message || 'Failed to update sub-department');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    useEffect(() => {
        fetchSubDepartments();
    }, []);

    return (
        <SubDepartmentContext.Provider value={{
            subDepartments,
            loading,
            error,
            createSubDepartment,
            updateSubDepartment,
            fetchSubDepartments
        }}>
            {children}
        </SubDepartmentContext.Provider>
    );
};

export const useSubDepartment = () => useContext(SubDepartmentContext);

export default SubDepartmentProvider;