import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const mockUsers = {
    'patient@test.com': { id: 1, name: 'Test Patient', role: 'patient' },
    'doctor@test.com': { id: 2, name: 'Test Doctor', role: 'doctor' },
    'pharmacy@test.com': { id: 3, name: 'Test Pharmacist', role: 'pharmacist' },
    'admin@test.com': { id: 4, name: 'System Admin', role: 'admin' }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('healthcore_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (password !== '123456') {
                    reject(new Error('Invalid password'));
                    return;
                }
                const foundUser = mockUsers[email.toLowerCase()];
                if (foundUser) {
                    setUser(foundUser);
                    localStorage.setItem('healthcore_user', JSON.stringify(foundUser));
                    resolve(foundUser);
                } else {
                    reject(new Error('User not found'));
                }
            }, 600); // Simulate network latency
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('healthcore_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
