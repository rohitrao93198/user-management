import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

function LoginForm({ onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login attempt with:', { username: email, password });

        try {
            console.log('Making API call to:', "http://192.168.12.43:8080/ems/login");

            const res = await fetch("http://192.168.12.43:8080/ems/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: email,  // Changed from email to username
                    password
                }),
            });

            console.log('API Response status:', res.status);
            const result = await res.json();
            console.log('API Response data:', result);

            if (result.responseCode === 200) {
                console.log('Login successful, calling onLoginSuccess with:', result.data);
                // Store token in localStorage
                localStorage.setItem('token', result.data.token);
                onLoginSuccess(result.data);
            } else {
                console.error('Login failed:', result.message);
                setError(result.message || "Login failed.");
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: "auto", mt: 10 }}>
            <Typography variant="h5" gutterBottom>Login</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth margin="normal" label="Email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth margin="normal" label="Password" type="password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
                    Login
                </Button>
            </form>
        </Box>
    );
}

export default LoginForm;
