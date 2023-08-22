import React from 'react';
import AuthProvider, { RequireAuth } from './contexts/AuthProvider';

import './App.css';
// import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Routes, Route, Navigate } from "react-router-dom";
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
