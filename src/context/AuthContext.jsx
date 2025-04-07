import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState('profile');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            setUser(loggedInUser);
            setSelectedMenuItem(localStorage.getItem("selectedMenuItem") || 'profile');
            if (location.pathname === '/login' || location.pathname === '/') {
                if (loggedInUser.roleType === "SUPER_ADMIN") {
                    navigate("/super-admin-dashboard");
                } else if (loggedInUser.roleType === "ADMIN") {
                    navigate("/admin-dashboard");
                } else if (loggedInUser.roleType === "USER") {
                    navigate("/user-dashboard");
                }
            }
        }
    }, [navigate, location.pathname]);

    const login = async (username, password) => {
        try {
            const response = await fetch("http://192.168.12.43:8080/ems/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            console.log("Login API Response:", data);

            if (response.ok && data.responseCode === 200) {
                const userData = {
                    userName: data.data.userName,
                    roleType: data.data.roleType,
                    email: data.data.email,
                    token: data.data.token,
                };

                setUser(userData);
                setSelectedMenuItem('profile');
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("selectedMenuItem", 'profile');

                if (userData.roleType === "SUPER_ADMIN") {
                    navigate("/profile");
                } else if (userData.roleType === "ADMIN") {
                    navigate("/profile");
                } else {
                    navigate("/profile");
                }
            } else {
                throw new Error(data.message || "Invalid credentials");
            }
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleMenuSelect = (menuItem) => {
        setSelectedMenuItem(menuItem);
        localStorage.setItem("selectedMenuItem", menuItem);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            selectedMenuItem,
            handleMenuSelect
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;