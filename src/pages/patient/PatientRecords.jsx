import { useState } from 'react';

const PatientRecords = () => {
    const [filterType, setFilterType] = useState('All Types');
    const records = [
        { id: 1, type: 'Lab Result', title: 'Complete Blood Count', date: '2023-10-15', doctor: 'Dr. Michael Chen', status: 'Available' },
        { id: 2, type: 'Prescription', title: 'Amoxicillin 500mg', date: '2023-09-22', doctor: 'Dr. Sarah Jenkins', status: 'Active' },
        { id: 3, type: 'Clinical Note', title: 'Annual Physical Summary', date: '2023-05-10', doctor: 'Dr. Sarah Jenkins', status: 'Available' },
        { id: 4, type: 'Imaging', title: 'Chest X-Ray', date: '2022-11-05', doctor: 'Dr. Emily Rodriguez', status: 'Available' },
    ];

    const filteredRecords = filterType === 'All Types'
        ? records
        : records.filter(record => record.type === filterType);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Medical Records</h2>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition">
                    Request Records Update
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="text-sm text-gray-500 font-semibold mb-1">Blood Type</p>
                    <p className="text-2xl font-bold text-red-600">O+</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="text-sm text-gray-500 font-semibold mb-1">Height</p>
                    <p className="text-2xl font-bold text-gray-800">178 cm</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <p className="text-sm text-gray-500 font-semibold mb-1">Weight</p>
                    <p className="text-2xl font-bold text-gray-800">75 kg</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-red-400">
                    <p className="text-sm text-gray-500 font-semibold mb-1">Allergies</p>
                    <p className="text-lg font-bold text-gray-800">Penicillin, Peanuts</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800">Recent Documents & Reports</h3>
                    <div className="flex gap-2 text-sm">
                        <select
                            className="border rounded-md px-2 py-1 outline-none"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="All Types">All Types</option>
                            <option value="Lab Result">Lab Results</option>
                            <option value="Prescription">Prescriptions</option>
                            <option value="Clinical Note">Clinical Notes</option>
                            <option value="Imaging">Imaging</option>
                        </select>
                    </div>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b text-sm text-gray-600">
                            <th className="p-4 font-semibold w-1/4">Date</th>
                            <th className="p-4 font-semibold w-1/4">Type</th>
                            <th className="p-4 font-semibold w-1/3">Document Name</th>
                            <th className="p-4 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredRecords.map(record => (
                            <tr key={record.id} className="hover:bg-red-50 transition group">
                                <td className="p-4 text-gray-600">{record.date}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${record.type === 'Lab Result' ? 'bg-red-100 text-red-700' : ''}
                    ${record.type === 'Prescription' ? 'bg-red-100 text-red-700' : ''}
                    ${record.type === 'Clinical Note' ? 'bg-red-100 text-red-700' : ''}
                    ${record.type === 'Imaging' ? 'bg-orange-100 text-orange-700' : ''}
                  `}>
                                        {record.type}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <p className="font-bold text-gray-800">{record.title}</p>
                                    <p className="text-xs text-gray-500">Ordered by {record.doctor}</p>
                                </td>
                                <td className="p-4">
                                    <button className="text-red-600 hover:text-red-800 font-semibold text-sm opacity-0 group-hover:opacity-100 transition">
                                        View &rarr;
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PatientRecords;
