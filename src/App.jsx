// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuperAdminDashboard from "./components/Dashboard/SuperAdminDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import UserDashboard from "./components/Dashboard/UserDashboard";
import CompanyPage from "./components/Company/CompanyPage"; // Import CompanyPage
import Navbar from "./components/Navbar"; // Import Navbar
import Sidebar from "./components/Sidebar"; // Import Sidebar

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        {/* Sidebar and Navbar should be visible on every page */}
        <Sidebar />
        <div style={{ flexGrow: 1, paddingLeft: "220px" }}>
          <Navbar />
          <Routes>
            {/* Route for SuperAdmin Dashboard */}
            <Route path="/superadmin" element={<SuperAdminDashboard />} />

            {/* Route for Admin Dashboard */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* Route for User Dashboard */}
            <Route path="/user" element={<UserDashboard />} />

            {/* Route for Company Management */}
            <Route path="/company" element={<CompanyPage />} /> {/* Add route for company page */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
