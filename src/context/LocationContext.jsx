import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchStates = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://192.168.12.43:8080/ems/api/get/all/state', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (data.responseCode === 200) {
                setStates(data.data);
            } else {
                throw new Error(data.message || 'Failed to fetch states');
            }
        } catch (error) {
            setError(error.message);
        }
    };


    const fetchCities = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://192.168.12.43:8080/ems/api/get/all/city', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (data.responseCode === 200) {
                setCities(data.data);
            } else {
                throw new Error(data.message || 'Failed to fetch cities');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchCitiesByState = async (stateId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://192.168.12.43:8080/ems/api/get/all/city/${stateId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (data.responseCode === 200) {
                return data.data;
            } else {
                throw new Error(data.message || 'Failed to fetch cities');
            }
        } catch (error) {
            setError(error.message);
            return [];
        }
    };

    const createState = async (stateName) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://192.168.12.43:8080/ems/api/save/state', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: stateName })
            });

            const data = await response.json();
            if (data.responseCode === 200) {
                await fetchStates();
                return data;
            } else {
                throw new Error(data.message || 'Failed to create state');
            }
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const createCity = async (cityName, stateId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://192.168.12.43:8080/ems/api/save/city', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: cityName,
                    stateDto: {
                        id: stateId
                    }
                })
            });

            const data = await response.json();
            if (data.responseCode === 200) {
                await fetchCities();
                return data;
            } else {
                throw new Error(data.message || 'Failed to create city');
            }
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                await Promise.all([fetchStates(), fetchCities()]);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    return (
        <LocationContext.Provider value={{
            states,
            cities,
            loading,
            error,
            fetchCitiesByState,
            createState,
            createCity,
            fetchStates,
            fetchCities
        }}>
            {children}
        </LocationContext.Provider>
    );
};