import React from 'react';
import AuthProvider, { RequireAuth } from './contexts/AuthProvider';
import {  Routes, Route,  } from "react-router-dom";
import AuthLayout from "./layouts/auth";
import AdminLayout from "./layouts/admin";

const App: React.FC = () => {

  return (
      <AuthProvider>
        <Routes>
          <Route
            path='/'
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          />
          <Route
            path='admin/*'
            element={
              <RequireAuth>
                <AdminLayout />
              </RequireAuth>
            }
          />
          <Route path="auth/*" element={<AuthLayout />} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
