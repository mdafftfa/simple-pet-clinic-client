import { Navigate } from 'react-router-dom';
import * as React from "react";

export const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) return <Navigate to="/login" replace />;
    
    if (allowedRoles && !allowedRoles.includes(userRole || "")) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};