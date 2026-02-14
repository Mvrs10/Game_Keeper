import React, { createContext, useState, type Dispatch } from "react";

export type AuthorizationContextType = {
    isAuthorized: boolean,
    setIsAuthorized: Dispatch<React.SetStateAction<boolean>>,
    userName: string,
    setUsername: Dispatch<React.SetStateAction<string>>,
    userId: string,
    setUserId: Dispatch<React.SetStateAction<string>>,
};

const initAuthorizationState = {
    isAuthorized: false,
    setIsAuthorized: () => { },
    userName: "",
    setUsername: () => { },
    userId: "",
    setUserId: () => { }
};

const AuthorizationContext = createContext<AuthorizationContextType>(initAuthorizationState);

const AuthorizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    return (
        <AuthorizationContext.Provider value={{ isAuthorized, setIsAuthorized, userName, setUsername: setUserName, userId: userId, setUserId: setUserId }}>
            {children}
        </AuthorizationContext.Provider>
    )
}

export { AuthorizationContext, AuthorizationProvider }