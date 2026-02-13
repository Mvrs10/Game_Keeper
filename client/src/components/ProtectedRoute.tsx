import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthorizationContext, type AuthorizationContextType } from "../context/AuthorizationContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthorized }: AuthorizationContextType = useContext(AuthorizationContext);

    if (!isAuthorized) {
        return <Navigate to="/" replace />;
    }
    return children;
}

export default ProtectedRoute;