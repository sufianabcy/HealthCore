import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const PharmacistInventory = () => {
    const { inventory, addInventoryItem } = useOutletContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [isRestockOpen, setIsRestockOpen] = useState(false);
    const [restockForm, setRestockForm] = useState({ name: '', category: '', stock: '' });

    const handleRestockSubmit = (e) => {
        e.preventDefault();
        if (restockForm.name && restockForm.category && restockForm.stock) {
            addInventoryItem({
                name: restockForm.name,
                category: restockForm.category,
                stock: parseInt(restockForm.stock, 10),
            });
            setIsRestockOpen(false);
            setRestockForm({ name: '', category: '', stock: '' });
        }
    };

    const filteredInventory = inventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Medication Inventory</h2>

                <div className="flex w-full md:w-auto gap-3">
                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search medications..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#E10600] font-medium text-gray-700 bg-white shadow-sm transition-shadow"
                        />
                    </div>
                    <button
                        onClick={() => setIsRestockOpen(true)}
                        className="bg-[#E10600] hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-sm whitespace-nowrap flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        Restock Form
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs text-gray-400 font-bold uppercase tracking-wider">
                                <th className="p-4 w-32 pl-6">Item ID</th>
                                <th className="p-4">Medication Name</th>
                                <th className="p-4 hidden md:table-cell">Category</th>
                                <th className="p-4 text-right">Physical Stock</th>
                                <th className="p-4 text-center w-32">Status</th>
                                <th className="p-4 text-right pr-6 w-32">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredInventory.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-12 text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">No Inventory Found</h3>
                                        <p className="text-gray-500">There are no items matching "{searchTerm}".</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredInventory.map(item => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition border-l-4 border-l-transparent">
                                        <td className="p-4 pl-6 text-sm font-bold text-gray-500">{item.id}</td>
                                        <td className="p-4">
                                            <p className="font-bold text-gray-800">{item.name}</p>
                                            <p className="text-xs text-gray-500 md:hidden mt-0.5">{item.category}</p>
                                        </td>
                                        <td className="p-4 text-sm font-medium text-gray-600 hidden md:table-cell">{item.category}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex flex-col border-gray-200 justify-end">
                                                <p className={`font-bold text-lg leading-none
                                                    ${item.stock < 10 ? 'text-[#E10600]' : item.stock < 50 ? 'text-orange-500' : 'text-gray-800'}
                                                `}>
                                                    {item.stock}
                                                </p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Units</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                                                ${item.status === 'In Stock' ? 'bg-green-50 text-green-700 border border-green-100' :
                                                    item.status === 'Low Stock' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                                                        'bg-red-50 text-red-700 border border-red-100 animate-pulse'}
                                            `}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4 pr-6 text-right">
                                            <button className="text-xs font-bold bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition shadow-sm">
                                                Edit Stock
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Restock Modal */}
            {isRestockOpen && (
                <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-800">New Restock Entry</h3>
                            <button onClick={() => setIsRestockOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <form onSubmit={handleRestockSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Medication Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#E10600] font-medium text-gray-800"
                                    placeholder="e.g. Lisinopril 10mg"
                                    value={restockForm.name}
                                    onChange={(e) => setRestockForm({ ...restockForm, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                                <select
                                    required
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#E10600] font-medium text-gray-800 bg-white"
                                    value={restockForm.category}
                                    onChange={(e) => setRestockForm({ ...restockForm, category: e.target.value })}
                                >
                                    <option value="" disabled>Select category...</option>
                                    <option value="Antibiotic">Antibiotic</option>
                                    <option value="Blood Pressure">Blood Pressure</option>
                                    <option value="Cholesterol">Cholesterol</option>
                                    <option value="Diabetes">Diabetes</option>
                                    <option value="Pain Relief">Pain Relief</option>
                                    <option value="Respiratory">Respiratory</option>
                                    <option value="Acid Reflux">Acid Reflux</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Quantity Received</label>
                                <input
                                    type="number"
                                    required min="1"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#E10600] font-medium text-gray-800"
                                    placeholder="e.g. 100"
                                    value={restockForm.stock}
                                    onChange={(e) => setRestockForm({ ...restockForm, stock: e.target.value })}
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsRestockOpen(false)}
                                    className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition shadow-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!restockForm.name || !restockForm.category || !restockForm.stock}
                                    className="px-5 py-2.5 bg-[#E10600] text-white font-bold rounded-xl hover:bg-red-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Confirm Restock
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PharmacistInventory;
