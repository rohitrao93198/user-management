import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

import Login from "./pages/Login";

import Profile from "./pages/Profile";
import Company from "./pages/Company";
import Users from "./pages/Users";
import Departments from "./pages/Departments";
import SubDepartments from "./pages/SubDepartments";
import AddCompany from "./components/company/AddCompany";
import EditCompany from "./components/company/EditCompany";
import AddDepartment from './components/department/AddDepartment';
import EditDepartment from './components/department/EditDepartment';
import AddUser from './components/user/AddUser';
import EditUser from './components/user/EditUser';
import AddSubDepartment from "./components/subdept/AddSubDepartment";
import EditSubDepartment from "./components/subdept/EditSubDepartment";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/profile" replace />} />

      {user ? (
        <>
          <Route
            path="/super-admin-dashboard"
            element={
              <>
                <Navbar />
                <Sidebar />
                <SuperAdminDashboard />
              </>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <>
                <Navbar />
                <Sidebar />
                <AdminDashboard />
              </>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <>
                <Navbar />
                <Sidebar />
                <UserDashboard />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <Navbar />
                <Sidebar />
                <Profile />
              </>
            }
          />
          <Route
            path="/company"
            element={
              <>
                <Navbar />
                <Sidebar />
                <Company />
              </>
            }
          />
          <Route
            path="/company/add"
            element={
              <>
                <Navbar />
                <Sidebar />
                <AddCompany />
              </>
            }
          />
          <Route
            path="/company/edit/:id"
            element={
              <>
                <Navbar />
                <Sidebar />
                <EditCompany />
              </>
            }
          />
          <Route
            path="/users"
            element={
              <>
                <Navbar />
                <Sidebar />
                <Users />
              </>
            }
          />
          <Route
            path="/users/add"
            element={
              <>
                <Navbar />
                <Sidebar />
                <AddUser />
              </>
            }
          />
          <Route
            path="/users/edit/:userId"
            element={
              <>
                <Navbar />
                <Sidebar />
                <EditUser />
              </>
            }
          />
          <Route
            path="/departments"
            element={
              <>
                <Navbar />
                <Sidebar />
                <Departments />
              </>
            }
          />
          <Route
            path="/department/add"
            element={
              <>
                <Navbar />
                <Sidebar />
                <AddDepartment />
              </>
            }
          />
          <Route
            path="/department/edit/:id"
            element={
              <>
                <Navbar />
                <Sidebar />
                <EditDepartment />
              </>
            }
          />
          <Route
            path="/subdepartments"
            element={
              <>
                <Navbar />
                <Sidebar />
                <SubDepartments />
              </>
            }
          />
          <Route
            path="/subdepartments/add"
            element={
              <>
                <Navbar />
                <Sidebar />
                <AddSubDepartment />
              </>
            }
          />
          <Route
            path="/subdepartments/edit/:id"
            element={
              <>
                <Navbar />
                <Sidebar />
                <EditSubDepartment />
              </>
            }
          />
        </>
      ) : (
        <Route path="*" element={<Login />} />
      )}
    </Routes>
  );
}

export default App;
