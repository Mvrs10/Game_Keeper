import React, { createContext, useState, type Dispatch } from "react";

export type AuthorizationContextType = {
    isAuthorized: boolean,
    setIsAuthorized: Dispatch<React.SetStateAction<boolean>>
};

const initAuthorizationState = {
    isAuthorized: false,
    setIsAuthorized: () => { }
};

const AuthorizationContext = createContext<AuthorizationContextType>(initAuthorizationState);

const AuthorizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    return (
        <AuthorizationContext.Provider value={{ isAuthorized, setIsAuthorized }}>
            {children}
        </AuthorizationContext.Provider>
    )
}

export { AuthorizationContext, AuthorizationProvider }