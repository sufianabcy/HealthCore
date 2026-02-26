import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

const AdminDoctors = () => {
    const { doctors, updateDoctorStatus } = useOutletContext();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDoctors = doctors.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.license.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Doctor Verification & Directory</h2>
                <div className="relative w-full sm:w-80">
                    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <input
                        type="text"
                        placeholder="Search by name or license..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#E10600] text-sm bg-white shadow-sm"
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative z-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                                <th className="px-6 py-4 font-bold">Doctor Profile</th>
                                <th className="px-6 py-4 font-bold">License #</th>
                                <th className="px-6 py-4 font-bold">Specialty</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 font-bold text-right">Verification Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredDoctors.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        <p className="font-medium text-gray-600">No doctors found matching criteria</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredDoctors.map(doc => (
                                    <tr key={doc.id} className={`hover:bg-gray-50/50 transition-colors group ${doc.status === 'Pending' ? 'bg-amber-50/30' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-800 text-base">{doc.name}</span>
                                                <span className="text-xs text-gray-500 font-mono mt-0.5">{doc.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm font-semibold tracking-wide text-gray-600 bg-gray-100 px-2 py-1 rounded-md">{doc.license}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                            {doc.specialization}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${doc.status === 'Verified' ? 'bg-blue-100 text-blue-700' :
                                                    doc.status === 'Pending' ? 'bg-amber-100 text-amber-700 border border-amber-200 shadow-sm' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {doc.status === 'Pending' && <span className="relative flex h-2 w-2 mr-1"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span></span>}
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button className="text-gray-400 hover:text-gray-800 font-bold text-sm px-2 py-1 pr-4 transition-colors">
                                                Edit
                                            </button>

                                            {doc.status === 'Pending' && (
                                                <button
                                                    onClick={() => updateDoctorStatus(doc.id, 'Verified')}
                                                    className="font-bold text-sm px-4 py-1.5 rounded-lg border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-700 transition-all shadow-sm"
                                                >
                                                    Approve License
                                                </button>
                                            )}

                                            {doc.status === 'Verified' && (
                                                <button
                                                    onClick={() => updateDoctorStatus(doc.id, 'Suspended')}
                                                    className="font-bold text-sm px-4 py-1.5 rounded-lg border border-gray-200 bg-white text-[#E10600] hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                                                >
                                                    Suspend
                                                </button>
                                            )}

                                            {doc.status === 'Suspended' && (
                                                <button
                                                    onClick={() => updateDoctorStatus(doc.id, 'Verified')}
                                                    className="font-bold text-sm px-4 py-1.5 rounded-lg border border-green-600 bg-green-600 text-white hover:bg-green-700 hover:border-green-700 transition-all shadow-sm"
                                                >
                                                    Restore
                                                </button>
                                            )}
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

export default AdminDoctors;
