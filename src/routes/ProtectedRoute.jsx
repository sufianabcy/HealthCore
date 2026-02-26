import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (!user) {
        // Not logged in, redirect to login page
        return <Navigate to="/auth/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        if (allowedRoles.includes('admin')) {
            const homePath = `/${user.role === 'pharmacist' ? 'pharmacy' : user.role}/dashboard`;
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 text-center">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Unauthorized Access</h1>
                        <p className="text-sm text-gray-500 mb-6">You need administrator privileges to view this page. If you believe this is a mistake, please contact support.</p>
                        <Link to={homePath} className="inline-block w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-xl transition-colors">
                            Return to Dashboard
                        </Link>
                    </div>
                </div>
            );
        }

        // Logged in but doesn't have the right role, redirect to unauthorized or home
        const path = user.role === 'pharmacist' ? 'pharmacy' : user.role;
        return <Navigate to={`/${path}/dashboard`} replace />;
    }

    return children;
};

export default ProtectedRoute;
