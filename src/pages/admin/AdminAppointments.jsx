import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

const AdminAppointments = () => {
    const { appointments, cancelAppointment } = useOutletContext();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAppointments = appointments.filter(a =>
        a.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Global Appointments</h2>
                <div className="relative w-full sm:w-80">
                    <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <input
                        type="text"
                        placeholder="Search by ID, Patient, or Doctor..."
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
                                <th className="px-6 py-4 font-bold">Appt ID</th>
                                <th className="px-6 py-4 font-bold">Patient</th>
                                <th className="px-6 py-4 font-bold">Doctor</th>
                                <th className="px-6 py-4 font-bold">Date & Time</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 font-bold text-right">Admin Override</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredAppointments.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        <p className="font-medium text-gray-600">No appointments found.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredAppointments.map(apt => (
                                    <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md">{apt.id}</span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-800">
                                            {apt.patient}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-800">
                                            {apt.doctor}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                            {new Date(apt.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${apt.status === 'Completed' ? 'bg-gray-100 text-gray-600' :
                                                    apt.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                        apt.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                            'bg-blue-100 text-blue-700'
                                                }`}>
                                                {apt.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
                                                {apt.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                                                <>
                                                    <button className="text-gray-400 hover:text-[#E10600] font-bold text-xs px-2 py-1 transition-colors">
                                                        Reassign
                                                    </button>
                                                    <button
                                                        onClick={() => cancelAppointment(apt.id)}
                                                        className="font-bold text-xs px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                                                    >
                                                        Force Cancel
                                                    </button>
                                                </>
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

export default AdminAppointments;
