import React, { createContext, useState, useContext, useEffect } from 'react';

export const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCompanies = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://192.168.12.43:8080/ems/api/get/all/company', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (data.responseCode === 200) {
                setCompanies(data.data);
            } else {
                throw new Error(data.message || 'Failed to fetch companies');
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

            if (!response.ok) {
                throw new Error(`Upload failed with status ${response.status}`);
            }

            try {
                const data = await response.json();
                if (data.responseCode === 200) {
                    return { success: true, profileUrl: data.data };
                }
                throw new Error(data.message || 'Failed to upload profile picture');
            } catch (jsonError) {
                const text = await response.text();
                console.error('Non-JSON response:', text);
                throw new Error('Server response was not in the expected format');
            }
        } catch (error) {
            console.error('Upload error:', error);
            throw new Error(`File upload failed: ${error.message}`);
        }
    };

    const createCompany = async (companyData, profilePicture) => {
        try {
            const uploadResult = await uploadProfilePicture(profilePicture);
            if (!uploadResult.success) {
                throw new Error('Failed to upload profile picture');
            }

            const token = localStorage.getItem('token');
            const response = await fetch('http://192.168.12.43:8080/ems/api/company/registration', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...companyData,
                    profileUrl: uploadResult.profileUrl,
                    createdAt: new Date().toISOString(),
                    updatedAt: null,
                    createdBy: null
                })
            });

            const data = await response.json();
            if (data.responseCode === 200) {
                await fetchCompanies();
                return { success: true, message: data.message };
            } else {
                throw new Error(data.message || 'Failed to create company');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const updateCompany = async (companyData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://192.168.12.43:8080/ems/api/company/registration', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...companyData,
                    updatedAt: new Date().toISOString()
                })
            });

            const data = await response.json();
            if (data.responseCode === 200) {
                await fetchCompanies();
                return { success: true, message: data.message };
            } else {
                throw new Error(data.message || 'Failed to update company');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };


    useEffect(() => {
        fetchCompanies();
    }, []);

    return (
        <CompanyContext.Provider value={{
            companies,
            loading,
            error,
            createCompany,
            updateCompany,
            fetchCompanies,
            uploadProfilePicture
        }}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompany = () => useContext(CompanyContext);