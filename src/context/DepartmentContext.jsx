import React, { createContext, useState, useContext, useEffect } from 'react';

export const DepartmentContext = createContext();

export const DepartmentProvider = ({ children }) => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDepartments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://192.168.12.43:8080/ems/api/get/all/department', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (data.responseCode === 200) {
                setDepartments(data.data);
            } else {
                throw new Error(data.message || 'Failed to fetch departments');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const createDepartment = async (departmentData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://192.168.12.43:8080/ems/api/department/registration', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...departmentData,
                    createdAt: new Date().toISOString(),
                    updatedAt: null
                })
            });

            const data = await response.json();
            if (data.responseCode === 200) {
                await fetchDepartments();
                return { success: true, message: data.message };
            } else {
                throw new Error(data.message || 'Failed to create department');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const updateDepartment = async (departmentData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://192.168.12.43:8080/ems/api/department/registration', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...departmentData,
                    updatedAt: new Date().toISOString()
                })
            });

            const data = await response.json();
            if (data.responseCode === 200) {
                await fetchDepartments();
                return { success: true, message: data.message };
            } else {
                throw new Error(data.message || 'Failed to update department');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    return (
        <DepartmentContext.Provider value={{
            departments,
            loading,
            error,
            createDepartment,
            updateDepartment,
            fetchDepartments
        }}>
            {children}
        </DepartmentContext.Provider>
    );
};

export const useDepartment = () => useContext(DepartmentContext);