import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

const AdminPatients = () => {
    const { patients, togglePatientStatus } = useOutletContext();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Patient Directory</h2>
                <div className="relative w-full sm:w-80">
                    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <input
                        type="text"
                        placeholder="Search patients by name or ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#E10600] text-sm bg-white shadow-sm"
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative z-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                                <th className="px-6 py-4 font-bold">Patient ID</th>
                                <th className="px-6 py-4 font-bold">Full Name</th>
                                <th className="px-6 py-4 font-bold">Age</th>
                                <th className="px-6 py-4 font-bold">Contact</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 font-bold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPatients.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        <p className="font-medium text-gray-600">No patients found</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredPatients.map(patient => (
                                    <tr key={patient.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{patient.id}</span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-800">
                                            {patient.name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                            {patient.age} yrs
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {patient.contact}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${patient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${patient.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                {patient.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button className="text-gray-400 hover:text-[#E10600] font-bold text-sm px-2 py-1 transition-colors">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => togglePatientStatus(patient.id)}
                                                className={`font-bold text-sm px-3 py-1.5 rounded-lg border transition-all shadow-sm ${patient.status === 'Active'
                                                        ? 'bg-white border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300'
                                                        : 'bg-green-600 border-green-600 text-white hover:bg-green-700 hover:border-green-700'
                                                    }`}
                                            >
                                                {patient.status === 'Active' ? 'Suspend' : 'Reactivate'}
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

export default AdminPatients;
