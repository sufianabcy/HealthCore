import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        // Not logged in, redirect to login page
        return <Navigate to="/auth/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Logged in but doesn't have the right role, redirect to unauthorized or home
        // For simplicity, redirecting to login to clear state or just to their own dashboard
        return <Navigate to={`/${user.role}`} replace />;
    }

    return children;
};

export default ProtectedRoute;
