import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const PharmacistLayout = () => {
    const { logout } = useAuth();
    // Shared state for prescriptions
    const [prescriptions, setPrescriptions] = useState([
        { id: 'RX-1042', patient: 'John Doe', doctor: 'Dr. Sarah Jenkins', medication: 'Amoxicillin 500mg', instructions: 'Take 1 capsule every 8 hours for 7 days', status: 'Pending', date: '2023-10-24' },
        { id: 'RX-1043', patient: 'Robert Johnson', doctor: 'Dr. Michael Chen', medication: 'Lisinopril 10mg', instructions: 'Take 1 tablet daily', status: 'Pending', date: '2023-10-24' },
        { id: 'RX-1040', patient: 'Alice Smith', doctor: 'Dr. Michael Chen', medication: 'Metformin 500mg', instructions: 'Take 1 tablet twice daily with meals', status: 'Verified', date: '2023-10-24' },
        { id: 'RX-1038', patient: 'Sarah Williams', doctor: 'Dr. Emily Rodriguez', medication: 'Levothyroxine 50mcg', instructions: 'Take 1 tablet daily on an empty stomach', status: 'Verified', date: '2023-10-23' },
        { id: 'RX-1035', patient: 'William Blake', doctor: 'Dr. Sarah Jenkins', medication: 'Atorvastatin 20mg', instructions: 'Take 1 tablet daily at bedtime', status: 'Dispensed', date: '2023-10-23' },
    ]);

    // Shared state for orders
    const [orders, setOrders] = useState([
        { id: 'ORD-5092', patient: 'Alice Smith', status: 'Processing', date: '2023-10-24', method: 'Pickup' },
        { id: 'ORD-5091', patient: 'Sarah Williams', status: 'Ready to Ship', date: '2023-10-24', method: 'Delivery' },
        { id: 'ORD-5088', patient: 'William Blake', status: 'Completed', date: '2023-10-23', method: 'Pickup' },
    ]);

    // Shared state for inventory
    const [inventory, setInventory] = useState([
        { id: 'MED-001', name: 'Amoxicillin 500mg', stock: 450, status: 'In Stock' },
        { id: 'MED-002', name: 'Lisinopril 10mg', stock: 12, status: 'Low Stock' },
        { id: 'MED-003', name: 'Metformin 500mg', stock: 850, status: 'In Stock' },
        { id: 'MED-004', name: 'Albuterol Inhaler', stock: 0, status: 'Out of Stock' },
        { id: 'MED-005', name: 'Ibuprofen 800mg', stock: 320, status: 'In Stock' },
    ]);

    const [isOnline, setIsOnline] = useState(true);
    const [profileOpen, setProfileOpen] = useState(false);

    const updatePrescriptionStatus = (id, newStatus) => {
        setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    };

    const updateOrderStatus = (id, newStatus) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    };

    const updateInventoryStock = (id, amount) => {
        setInventory(prev => prev.map(i => {
            if (i.id === id) {
                const newStock = Math.max(0, i.stock + amount);
                const newStatus = newStock === 0 ? 'Out of Stock' : (newStock < 50 ? 'Low Stock' : 'In Stock');
                return { ...i, stock: newStock, status: newStatus };
            }
            return i;
        }));
    };

    const addInventoryItem = (item) => {
        setInventory(prev => [
            {
                id: `MED-${Math.floor(100 + Math.random() * 900)}`,
                status: item.stock === 0 ? 'Out of Stock' : (item.stock < 50 ? 'Low Stock' : 'In Stock'),
                ...item
            },
            ...prev
        ]);
    };

    return (
        <div className="h-screen flex bg-gray-50 overflow-hidden text-gray-900">
            {/* Sidebar Navigation */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 hidden md:flex flex-col z-20">
                <div className="p-6 pb-2">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-[#E10600] rounded-lg flex items-center justify-center text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold text-gray-800 tracking-tight">HealthCore</h1>
                    </div>
                </div>
                <div className="px-6 overflow-y-auto flex-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Main Menu</p>
                    <nav className="space-y-1.5">
                        <NavLink to="/pharmacist/dashboard" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActive ? 'bg-red-50 text-[#E10600]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                            Dashboard
                        </NavLink>
                        <NavLink to="/pharmacist/prescriptions" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActive ? 'bg-red-50 text-[#E10600]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Incoming Prescriptions
                        </NavLink>
                        <NavLink to="/pharmacist/orders" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActive ? 'bg-red-50 text-[#E10600]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            Orders
                        </NavLink>
                        <NavLink to="/pharmacist/inventory" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActive ? 'bg-red-50 text-[#E10600]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                            Inventory
                        </NavLink>
                    </nav>
                </div>
                <div className="p-6 mt-auto">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Settings</p>
                    <nav className="space-y-1.5">
                        <NavLink to="/pharmacist/profile" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActive ? 'bg-red-50 text-[#E10600]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            Profile
                        </NavLink>
                    </nav>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col md:ml-64 min-w-0 h-screen">
                {/* Pharmacist Top Navbar */}
                <header className="h-16 bg-white border-b border-gray-200 px-6 md:px-8 flex items-center justify-between sticky top-0 z-10 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden text-gray-500 hover:text-gray-800 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                        <div className="hidden sm:block">
                            <div className="flex items-center gap-2">
                                <h2 className="text-lg font-bold text-gray-800 tracking-tight">CVS Pharmacy #4192</h2>
                                <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                <span className="text-sm font-medium text-gray-500">{isOnline ? 'Online' : 'Offline'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <button className="relative text-gray-400 hover:text-gray-600 transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#E10600] border-2 border-white rounded-full"></span>
                        </button>

                        <div className="relative">
                            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 focus:outline-none">
                                <img src="https://ui-avatars.com/api/?name=P+H&background=E10600&color=fff" alt="Profile" className="w-9 h-9 rounded-full border border-gray-100" />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                                    <button onClick={() => setIsOnline(!isOnline)} className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        Set status to {isOnline ? 'Offline' : 'Online'}
                                    </button>
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm font-medium text-[#E10600] hover:bg-red-50">
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <Outlet context={{ prescriptions, updatePrescriptionStatus, orders, updateOrderStatus, inventory, updateInventoryStock, addInventoryItem }} />
                </main>
            </div>
        </div>
    );
};

export default PharmacistLayout;
