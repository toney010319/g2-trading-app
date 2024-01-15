import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        // Get auth state from localStorage when the provider is first mounted
        const savedAuthState = localStorage.getItem('authState');
        return savedAuthState ? JSON.parse(savedAuthState) : {};
    });
    useEffect(() => {
        // Save auth state to localStorage whenever it changes
        localStorage.setItem('authState', JSON.stringify(auth));
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;