import { Link, useOutletContext, useNavigate } from 'react-router-dom';

const PharmacistDashboard = () => {
    const { prescriptions, orders, inventory } = useOutletContext();
    const navigate = useNavigate();

    // Derived states
    const pendingPrescriptionsCount = prescriptions.filter(p => p.status === 'Pending').length;
    const processingOrdersCount = orders.filter(o => o.status === 'Processing').length;
    const completedOrdersCount = orders.filter(o => o.status === 'Completed').length;
    const lowStockCount = inventory.filter(i => i.status === 'Low Stock' || i.status === 'Out of Stock').length;
    const recentQueue = prescriptions.slice(0, 5); // Show latest 5

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight mb-8">Pharmacy Dashboard</h2>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -z-10 group-hover:bg-red-100 transition-colors"></div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold mb-1">New Prescriptions</p>
                        <p className="text-3xl font-bold text-gray-800">{pendingPrescriptionsCount}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-[#E10600] font-semibold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        Needs Verification
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-10 group-hover:bg-blue-100 transition-colors"></div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold mb-1">Orders Processing</p>
                        <p className="text-3xl font-bold text-gray-800">{processingOrdersCount}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-blue-600 font-semibold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        Being Prepared
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -z-10 group-hover:bg-green-100 transition-colors"></div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold mb-1">Orders Completed</p>
                        <p className="text-3xl font-bold text-gray-800">{completedOrdersCount}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-green-600 font-semibold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        Ready / Delivered
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -z-10 group-hover:bg-orange-100 transition-colors"></div>
                    <div>
                        <p className="text-sm text-gray-500 font-bold mb-1">Low Stock Items</p>
                        <p className="text-3xl font-bold text-gray-800">{lowStockCount}</p>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-orange-600 font-semibold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        Restock Required
                    </div>
                </div>
            </div>

            {/* Recent Prescriptions View */}
            <div className="bg-white border text-gray-800 border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-lg font-bold text-gray-800">Recent Prescriptions</h3>
                    <Link to="/pharmacist/prescriptions" className="text-sm font-bold text-[#E10600] hover:text-red-700 transition flex items-center gap-1">
                        View All <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 bg-white text-xs text-gray-400 font-bold uppercase tracking-wider">
                                <th className="p-4 w-32">Date</th>
                                <th className="p-4 w-40">Prescription ID</th>
                                <th className="p-4">Patient Name</th>
                                <th className="p-4">Prescribed By</th>
                                <th className="p-4 w-32">Status</th>
                                <th className="p-4 text-right w-32">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentQueue.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-gray-500 font-medium">No recent prescriptions recorded.</td>
                                </tr>
                            ) : (
                                recentQueue.map(rx => (
                                    <tr key={rx.id} className="hover:bg-gray-50 transition">
                                        <td className="p-4">
                                            <p className="font-semibold text-gray-800">{new Date(rx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-gray-800">{rx.id}</p>
                                        </td>
                                        <td className="p-4 flex items-center gap-3">
                                            <img src={`https://ui-avatars.com/api/?name=${(rx.patient || '').replace(' ', '+')}&background=F3F4F6&color=111827`} alt={rx.patient} className="w-8 h-8 rounded-full border border-gray-200" />
                                            <p className="font-bold text-gray-800">{rx.patient}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm text-gray-600 font-medium">{rx.doctor}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                                                ${rx.status === 'Verified' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                                    rx.status === 'Dispensed' ? 'bg-green-50 text-green-700 border border-green-100' :
                                                        'bg-yellow-50 text-yellow-700 border border-yellow-100'}
                                            `}>
                                                {rx.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => navigate('/pharmacist/prescriptions', { state: { rxId: rx.id } })}
                                                className="text-xs font-bold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition shadow-sm"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PharmacistDashboard;
