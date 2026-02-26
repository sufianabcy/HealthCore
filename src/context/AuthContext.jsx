import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // null means not logged in

    // mock function to simulate logging in
    const login = (role) => {
        setUser({
            id: 1,
            name: `Test ${role}`,
            role: role // 'admin', 'doctor', 'patient', 'pharmacist'
        });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
