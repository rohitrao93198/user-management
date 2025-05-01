// src/pages/LoginPage.jsx
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function LoginPage() {
    const navigate = useNavigate();

    const handleLoginSuccess = (userData) => {
        // Save to localStorage
        localStorage.setItem("currentUser", JSON.stringify(userData));

        const { roleType } = userData;

        if (roleType === "SUPER_ADMIN") navigate("/superadmin", { state: userData });
        else if (roleType === "ADMIN") navigate("/admin", { state: userData });
        else navigate("/user", { state: userData });
    };

    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
}

export default LoginPage;
