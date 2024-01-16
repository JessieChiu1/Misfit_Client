import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({ user: undefined })

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token") || undefined;
            const payload = token && parseJwt(token);
            setUser(payload && { username: payload.username, id: payload.id });
        }
    }, []);

    const setToken = (token) => {
        if (typeof window !== "undefined") {
            if (!token) {
                localStorage.removeItem("token");
                setUser(undefined);
            } else {
                localStorage.setItem("token", token);
                const payload = token && parseJwt(token);
                setUser(payload && { username: payload.username, id: payload.id });
            }
        }
    };

    const getToken = () => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("token") || undefined;
        }
        return undefined;
    };

    return (
        <AuthContext.Provider value={{ user, setToken, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// function for parsing JWT
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
