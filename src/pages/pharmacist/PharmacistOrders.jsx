import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const PharmacistOrders = () => {
    const { orders, updateOrderStatus } = useOutletContext();
    const [filter, setFilter] = useState('All');

    const filteredOrders = orders.filter(order => {
        if (filter === 'All') return true;
        if (filter === 'Processing') return order.status === 'Processing';
        if (filter === 'Ready') return order.status === 'Ready to Ship';
        if (filter === 'Completed') return order.status === 'Completed';
        return true;
    });

    const statusOptions = ['Processing', 'Ready to Ship', 'Completed'];

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight mb-8">Pharmacy Orders</h2>

            <div className="bg-white border text-gray-800 border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
                    <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                        {['All', 'Processing', 'Ready', 'Completed'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${filter === f ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 bg-white text-xs text-gray-400 font-bold uppercase tracking-wider">
                                <th className="p-4 w-40">Order ID</th>
                                <th className="p-4">Patient Name</th>
                                <th className="p-4">Delivery Method</th>
                                <th className="p-4 w-48">Status</th>
                                <th className="p-4 text-right w-32">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">No Orders Found</h3>
                                        <p className="text-gray-500">There are no orders matching the '{filter}' filter.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map(order => (
                                    <tr key={order.id} className={`hover:bg-gray-50 transition border-l-4 ${order.status === 'Processing' ? 'border-l-blue-400' : order.status === 'Ready to Ship' ? 'border-l-yellow-400' : 'border-l-green-400'}`}>
                                        <td className="p-4">
                                            <p className="font-bold text-gray-800">{order.id}</p>
                                            <p className="text-xs text-gray-500 mt-1">{new Date(order.date).toLocaleDateString()}</p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img src={`https://ui-avatars.com/api/?name=${(order.patient || '').replace(' ', '+')}&background=F3F4F6&color=111827`} alt={order.patient} className="w-8 h-8 rounded-full border border-gray-200" />
                                                <p className="font-bold text-gray-800">{order.patient}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                {order.method === 'Delivery' ? (
                                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
                                                ) : (
                                                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                                                )}
                                                <p className="font-bold text-gray-700">{order.method}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <select
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                className={`text-xs font-bold px-3 py-1.5 rounded-lg border outline-none appearance-none cursor-pointer pr-8 bg-no-repeat bg-[right_0.5rem_center] bg-[length:1em_1em]
                                                    ${order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                        order.status === 'Ready to Ship' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                            'bg-green-50 text-green-700 border-green-200'}
                                                `}
                                                style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")` }}
                                            >
                                                {statusOptions.map(opt => (
                                                    <option key={opt} value={opt} className="text-gray-800 bg-white">{opt}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-xs font-bold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition shadow-sm">
                                                Details
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

export default PharmacistOrders;
