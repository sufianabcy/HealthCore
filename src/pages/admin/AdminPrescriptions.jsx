import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

const AdminPrescriptions = () => {
    const { prescriptions, togglePrescriptionFlag } = useOutletContext();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPrescriptions = prescriptions.filter(p =>
        p.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.pharmacy.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Prescription Monitoring</h2>
                <div className="relative w-full sm:w-80">
                    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <input
                        type="text"
                        placeholder="Search by ID, Patient, Doctor, Pharmacy..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#E10600] text-sm bg-white shadow-sm"
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative z-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                                <th className="px-6 py-4 font-bold">Rx ID</th>
                                <th className="px-6 py-4 font-bold">Patient</th>
                                <th className="px-6 py-4 font-bold">Prescribing Doctor</th>
                                <th className="px-6 py-4 font-bold">Fulfilling Pharmacy</th>
                                <th className="px-6 py-4 font-bold">Live Status</th>
                                <th className="px-6 py-4 font-bold text-right">Audit Options</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPrescriptions.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        <p className="font-medium text-gray-600">No prescriptions found.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredPrescriptions.map(rx => (
                                    <tr key={rx.id} className={`hover:bg-gray-50/50 transition-colors group ${rx.flagged ? 'bg-red-50/30' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {rx.flagged && <svg className="w-4 h-4 text-[#E10600]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>}
                                                <span className={`font-mono text-sm tracking-wide ${rx.flagged ? 'text-[#E10600] font-bold' : 'text-gray-500 bg-gray-100 px-2 py-1 rounded-md'}`}>{rx.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-800">
                                            {rx.patient}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-600">
                                            {rx.doctor}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                                            {rx.pharmacy}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${rx.status === 'Dispensed' ? 'bg-green-100 text-green-700' :
                                                    rx.status === 'Verified' ? 'bg-blue-100 text-blue-700' :
                                                        rx.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                            rx.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                                'bg-gray-100 text-gray-600'
                                                }`}>
                                                {rx.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button className="text-gray-400 hover:text-gray-800 font-bold text-xs px-2 py-1 transition-colors">
                                                View Tx
                                            </button>
                                            <button
                                                onClick={() => togglePrescriptionFlag(rx.id)}
                                                className={`font-bold text-xs px-3 py-1.5 rounded-lg border transition-all shadow-sm ${rx.flagged
                                                        ? 'bg-red-600 border-red-600 text-white hover:bg-red-700'
                                                        : 'bg-white border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300'
                                                    }`}
                                            >
                                                {rx.flagged ? 'Unflag' : 'Flag for Audit'}
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

export default AdminPrescriptions;
