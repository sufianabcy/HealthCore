import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (role) => {
        login(role);
        navigate(`/${role}`);
    };

    return (
        <div className="flex items-center justify-center min-h-[85vh] bg-gray-50 relative">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-red-600 rounded-xl text-white mb-4 shadow-sm">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 tracking-tight">HealthCore</h2>
                    <p className="text-sm text-gray-500 mt-2">Select your portal to continue</p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => handleLogin('patient')}
                        className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-medium transition-all"
                    >
                        <span>Patient Portal</span>
                        <span className="text-gray-400">→</span>
                    </button>
                    <button
                        onClick={() => handleLogin('doctor')}
                        className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-medium transition-all"
                    >
                        <span>Doctor Portal</span>
                        <span className="text-gray-400">→</span>
                    </button>
                    <button
                        onClick={() => handleLogin('pharmacist')}
                        className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-medium transition-all"
                    >
                        <span>Pharmacy Portal</span>
                        <span className="text-gray-400">→</span>
                    </button>
                </div>
            </div>

            {/* Subtle Admin Access link (Option A) */}
            <div className="fixed bottom-4 right-4 z-50">
                <button
                    onClick={() => handleLogin('admin')}
                    className="text-xs text-transparent hover:text-gray-400 transition-colors duration-300 cursor-default hover:cursor-pointer p-4"
                >
                    Admin Access
                </button>
            </div>
        </div>
    );
};

export default Login;
