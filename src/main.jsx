import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { CompanyProvider } from './context/CompanyContext';
import { DepartmentProvider } from './context/DepartmentContext';
import { SubDepartmentProvider } from './context/SubDepartmentContext';
import { LocationProvider } from './context/LocationContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <LocationProvider>
            <CompanyProvider>
              <DepartmentProvider>
                <SubDepartmentProvider>
                  <App />
                </SubDepartmentProvider>
              </DepartmentProvider>
            </CompanyProvider>
          </LocationProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);