import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

import Spinner from "./components/Spinner";

// user === undefined -> still checking the session
// user === null      -> not logged in
// user === {...}     -> logged in
const AuthContext = createContext({ user: undefined, refreshUser: async () => { }, setUser: () => { } });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(undefined);

    const refreshUser = useCallback(async () => {
        try {
            const response = await axios.get("/proxy/user/info");
            setUser(response.data);
            return response.data;
        } catch {
            setUser(null);
            return null;
        }
    }, []);

    useEffect(() => { refreshUser() }, [refreshUser]);

    return (
        <AuthContext.Provider value={{ user, setUser, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export function RequireAuth({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    if (user === undefined) return <Spinner />;
    if (user === null) return <Navigate to="/login" replace state={{ from: location }} />;
    return children;
}

export function GuestOnly({ children }) {
    const { user } = useAuth();
    const location = useLocation();

    if (user === undefined) return <Spinner />;
    if (user) {
        const from = location.state?.from;
        return <Navigate to={from ? `${from.pathname}${from.search}` : "/"} replace />;
    }
    return children;
}
