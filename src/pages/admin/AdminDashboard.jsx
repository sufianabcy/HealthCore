import { useOutletContext, Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { patients, doctors, pharmacies, appointments, prescriptions, logs } = useOutletContext();

    // Compute Metrics dynamically
    const totalPatients = patients.length;
    const totalDoctors = doctors.length;
    const totalPharmacies = pharmacies.length;

    // Appointments happening today
    const todayStr = new Date().toISOString().split('T')[0];
    const appointmentsToday = appointments.filter(a => a.date.startsWith(todayStr)).length;

    // Active consultations
    const activeConsultations = appointments.filter(a => a.status === 'Active').length;

    // Pending Prescriptions
    const pendingPrescriptions = prescriptions.filter(p => p.status === 'Pending').length;

    // Derived Lists for UI
    const recentPatients = [...patients].sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)).slice(0, 3);
    const recentAppointments = [...appointments].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

    return (
        <div className="animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 tracking-tight">System Overview</h2>

            {/* High-Level Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
                <Link to="/admin/patients" className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center hover:shadow-md hover:border-gray-200 transition-all group cursor-pointer text-left">
                    <p className="text-sm font-bold text-gray-500 mb-1 group-hover:text-gray-700 transition-colors">Total Patients</p>
                    <p className="text-3xl font-black text-gray-800">{totalPatients}</p>
                </Link>
                <Link to="/admin/doctors" className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center hover:shadow-md hover:border-gray-200 transition-all group cursor-pointer text-left">
                    <p className="text-sm font-bold text-gray-500 mb-1 group-hover:text-gray-700 transition-colors">Total Doctors</p>
                    <p className="text-3xl font-black text-gray-800">{totalDoctors}</p>
                </Link>
                <Link to="/admin/pharmacies" className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center hover:shadow-md hover:border-gray-200 transition-all group cursor-pointer text-left">
                    <p className="text-sm font-bold text-gray-500 mb-1 group-hover:text-gray-700 transition-colors">Pharmacies</p>
                    <p className="text-3xl font-black text-gray-800">{totalPharmacies}</p>
                </Link>
                <Link to="/admin/appointments" className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center hover:shadow-md hover:border-gray-200 transition-all group cursor-pointer text-left">
                    <p className="text-sm font-bold text-gray-500 mb-1 group-hover:text-gray-700 transition-colors">Appt. Today</p>
                    <p className="text-3xl font-black text-blue-600 group-hover:text-blue-700 transition-colors">{appointmentsToday}</p>
                </Link>
                <Link to="/admin/appointments" className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center hover:shadow-md hover:border-gray-200 transition-all group cursor-pointer text-left">
                    <p className="text-sm font-bold text-gray-500 mb-1 group-hover:text-gray-700 transition-colors">Active Consult</p>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className={`${activeConsultations > 0 ? 'animate-ping' : ''} absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75`}></span>
                            <span className={`relative inline-flex rounded-full h-3 w-3 ${activeConsultations > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        </span>
                        <p className="text-3xl font-black text-green-600 group-hover:text-green-700 transition-colors">{activeConsultations}</p>
                    </div>
                </Link>
                <Link to="/admin/prescriptions" className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center hover:shadow-md hover:border-gray-200 transition-all group cursor-pointer text-left">
                    <p className="text-sm font-bold text-gray-500 mb-1 group-hover:text-gray-700 transition-colors">Pending Rx</p>
                    <p className="text-3xl font-black text-amber-500 group-hover:text-amber-600 transition-colors">{pendingPrescriptions}</p>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Data Tables */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Recent Registrations Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-800">Recent Registrations</h3>
                            <Link to="/admin/patients" className="text-[#E10600] text-sm font-bold hover:underline">View All Patients</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                        <th className="px-6 py-4 font-bold">Patient</th>
                                        <th className="px-6 py-4 font-bold">Registration Date</th>
                                        <th className="px-6 py-4 font-bold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentPatients.map(patient => (
                                        <tr key={patient.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-gray-800">{patient.name}</p>
                                                <p className="text-xs text-gray-500">{patient.id}</p>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-gray-600">
                                                {new Date(patient.registrationDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${patient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                    {patient.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Recent Appointments Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-800">Recent Appointments</h3>
                            <Link to="/admin/appointments" className="text-[#E10600] text-sm font-bold hover:underline">Manage Schedule</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                        <th className="px-6 py-4 font-bold">Patient</th>
                                        <th className="px-6 py-4 font-bold">Doctor</th>
                                        <th className="px-6 py-4 font-bold">Date & Time</th>
                                        <th className="px-6 py-4 font-bold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {recentAppointments.map(apt => (
                                        <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-gray-800">{apt.patient}</td>
                                            <td className="px-6 py-4 font-medium text-gray-600">{apt.doctor}</td>
                                            <td className="px-6 py-4 font-medium text-gray-600">
                                                {new Date(apt.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${apt.status === 'Completed' ? 'bg-gray-100 text-gray-600' :
                                                    apt.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                        apt.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-red-100 text-red-700'
                                                    }`}>
                                                    {apt.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Right Column: Alerts & Logs */}
                <div className="space-y-8">

                    {/* System Alerts */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 bg-red-50/30 flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#E10600]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                            <h3 className="text-lg font-bold text-gray-800">System Alerts</h3>
                        </div>
                        <div className="p-4 space-y-3">
                            {doctors.filter(d => d.status === 'Pending').map(d => (
                                <div key={d.id} className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-amber-900">Doctor Pending Verification</p>
                                        <p className="text-xs text-amber-700 mt-1">{d.name} ({d.license}) is awaiting manual review.</p>
                                    </div>
                                    <Link to="/admin/doctors" className="text-xs font-bold text-amber-900 bg-amber-100/50 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition">Review</Link>
                                </div>
                            ))}
                            {prescriptions.filter(p => p.flagged).map(p => (
                                <div key={p.id} className="bg-red-50 rounded-xl p-4 border border-red-100 flex items-start justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-red-900">Flagged Prescription</p>
                                        <p className="text-xs text-red-700 mt-1">{p.id} prescribed by {p.doctor} needs auditing.</p>
                                    </div>
                                    <Link to="/admin/prescriptions" className="text-xs font-bold text-red-900 bg-red-100/50 hover:bg-red-200 px-3 py-1.5 rounded-lg transition">Audit</Link>
                                </div>
                            ))}
                            {doctors.filter(d => d.status === 'Pending').length === 0 && prescriptions.filter(p => p.flagged).length === 0 && (
                                <div className="text-center py-6 text-gray-400">
                                    <svg className="w-12 h-12 mx-auto text-gray-200 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <p className="text-sm font-bold text-gray-400">All systems clear</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Live Activity Logs */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-800">Activity Logs</h3>
                            <Link to="/admin/logs" className="text-gray-500 hover:text-gray-800 text-sm font-bold transition">View All</Link>
                        </div>
                        <div className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto custom-scrollbar">
                            {logs.slice(0, 5).map(log => (
                                <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-[#E10600]">{log.user}</span>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700">{log.action}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
