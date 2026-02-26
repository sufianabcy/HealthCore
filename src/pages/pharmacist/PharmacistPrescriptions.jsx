import { useState, useEffect } from 'react';
import { useOutletContext, useLocation } from 'react-router-dom';

const PharmacistPrescriptions = () => {
    const { prescriptions, updatePrescriptionStatus } = useOutletContext();
    const location = useLocation();

    const [view, setView] = useState('list'); // 'list' or 'detail'
    const [selectedRx, setSelectedRx] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    // Check if routed with a specific Rx ID from Dashboard
    useEffect(() => {
        if (location.state && location.state.rxId) {
            const rx = prescriptions.find(p => p.id === location.state.rxId);
            if (rx) {
                setSelectedRx(rx);
                setView('detail');
            }
            // Clear history state safely so refresh doesn't pop open the detail view again
            window.history.replaceState({}, document.title);
        }
    }, [location.state, prescriptions]);

    const filteredPrescriptions = prescriptions.filter(p => {
        if (activeFilter === 'All') return true;
        return p.status === activeFilter;
    });

    const handleViewDetails = (rx) => {
        setSelectedRx(rx);
        setView('detail');
    };

    const handleAction = (status) => {
        if (selectedRx) {
            updatePrescriptionStatus(selectedRx.id, status);
            // If they dispense it, we might want to flip back to the list, else let them stay
            if (status === 'Dispensed') {
                setView('list');
                setSelectedRx(null);
            } else {
                setSelectedRx({ ...selectedRx, status });
            }
        }
    };

    const handleReject = () => {
        if (selectedRx && rejectReason.trim()) {
            // Setup a rejected status globally, though requested flow just said Reject with reason modal
            updatePrescriptionStatus(selectedRx.id, 'Rejected');
            setRejectModalOpen(false);
            setRejectReason('');
            setView('list');
            setSelectedRx(null);
        }
    };

    if (view === 'detail' && selectedRx) {
        return (
            <div className="max-w-7xl mx-auto pb-12">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => { setView('list'); setSelectedRx(null); }}
                        className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
                            Prescription Details
                            <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider
                                ${selectedRx.status === 'Verified' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                    selectedRx.status === 'Dispensed' ? 'bg-green-50 text-green-700 border border-green-100' :
                                        selectedRx.status === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-100' :
                                            'bg-yellow-50 text-yellow-700 border border-yellow-100'}
                            `}>
                                {selectedRx.status}
                            </span>
                        </h2>
                        <p className="text-sm text-gray-500 font-medium">ID: {selectedRx.id} • Received: {new Date(selectedRx.date).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Medication Details */}
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-800">Medication Regimen</h3>
                            </div>
                            <div className="p-6">
                                <div className="p-5 bg-red-50/30 border border-red-100 rounded-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="text-xl font-bold text-[#E10600]">{selectedRx.medication}</h4>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1">Dosage</p>
                                            <p className="font-semibold text-gray-800">Standard</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1">Frequency</p>
                                            <p className="font-semibold text-gray-800">As Directed</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1">Duration</p>
                                            <p className="font-semibold text-gray-800">Standard</p>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-red-100/50">
                                        <p className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-1">Prescriber Instructions</p>
                                        <p className="font-medium text-gray-700 bg-white p-3 rounded-lg border border-red-50">{selectedRx.instructions}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Panel */}
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden p-6 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-gray-800 mb-1">Workflow Actions</h3>
                                <p className="text-sm text-gray-500">Update the status of this prescription across the network.</p>
                            </div>
                            <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                                {selectedRx.status === 'Pending' && (
                                    <>
                                        <button
                                            onClick={() => setRejectModalOpen(true)}
                                            className="w-full sm:w-44 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-100 font-bold rounded-xl transition shadow-sm"
                                        >
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => handleAction('Verified')}
                                            className="w-full sm:w-44 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-sm"
                                        >
                                            Verify & Approve
                                        </button>
                                    </>
                                )}
                                {selectedRx.status === 'Verified' && (
                                    <button
                                        onClick={() => handleAction('Dispensed')}
                                        className="w-full sm:w-48 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition shadow-sm"
                                    >
                                        Mark as Dispensed
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Meta Information Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                            <h3 className="font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">Patient Details</h3>
                            <div className="flex items-center gap-4 mb-6">
                                <img src={`https://ui-avatars.com/api/?name=${selectedRx.patient.replace(' ', '+')}&background=F3F4F6&color=111827`} alt={selectedRx.patient} className="w-12 h-12 rounded-full border border-gray-200" />
                                <div>
                                    <p className="font-bold text-gray-800 text-lg">{selectedRx.patient}</p>
                                    <p className="text-sm text-gray-500 font-medium">DOB: 05/14/1982 (41y)</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">Allergies</p>
                                    <p className="font-semibold text-red-600">Penicillin, Peanuts</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">Contact</p>
                                    <p className="font-medium text-gray-800">+1 (555) 019-8472</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                            <h3 className="font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">Prescriber Details</h3>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-[#E10600]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">{selectedRx.doctor}</p>
                                    <p className="text-sm text-gray-500 font-medium">Cardiology</p>
                                </div>
                            </div>
                            <button className="w-full mt-2 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition text-sm flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                Contact Prescriber
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reject Modal */}
                {rejectModalOpen && (
                    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Reject Prescription</h3>
                                <p className="text-sm text-gray-500 mb-6">Please provide a reason for rejecting this prescription. The prescriber will be notified.</p>

                                <label className="block text-sm font-bold text-gray-700 mb-2">Rejection Reason</label>
                                <textarea
                                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-500 font-medium text-gray-800 min-h-[100px] resize-none"
                                    placeholder="E.g., Drug interaction, unclear instructions..."
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
                                <button
                                    onClick={() => setRejectModalOpen(false)}
                                    className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition shadow-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReject}
                                    disabled={!rejectReason.trim()}
                                    className="px-5 py-2.5 bg-[#E10600] text-white font-bold rounded-xl hover:bg-red-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Confirm Rejection
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight mb-8">Incoming Prescriptions</h2>

            <div className="bg-white border text-gray-800 border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/50">
                    <div className="flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
                        {['All', 'Pending', 'Verified', 'Dispensed'].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${activeFilter === filter ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 bg-white text-xs text-gray-400 font-bold uppercase tracking-wider">
                                <th className="p-4 w-40">Prescription ID</th>
                                <th className="p-4">Patient Name</th>
                                <th className="p-4">Doctor</th>
                                <th className="p-4">Medication Summary</th>
                                <th className="p-4 w-32">Status</th>
                                <th className="p-4 text-right w-32">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredPrescriptions.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-12 text-center">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 mb-1">No Prescriptions Found</h3>
                                        <p className="text-gray-500">There are no prescriptions matching the '{activeFilter}' filter.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredPrescriptions.map(rx => (
                                    <tr key={rx.id} className={`hover:bg-gray-50 transition border-l-4 ${rx.status === 'Pending' ? 'border-l-yellow-400' : rx.status === 'Verified' ? 'border-l-blue-400' : rx.status === 'Dispensed' ? 'border-l-green-400' : 'border-l-transparent'}`}>
                                        <td className="p-4">
                                            <p className="font-bold text-gray-800">{rx.id}</p>
                                            <p className="text-xs text-gray-500 mt-1">{new Date(rx.date).toLocaleDateString()}</p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img src={`https://ui-avatars.com/api/?name=${(rx.patient || '').replace(' ', '+')}&background=F3F4F6&color=111827`} alt={rx.patient} className="w-8 h-8 rounded-full border border-gray-200" />
                                                <p className="font-bold text-gray-800">{rx.patient}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm font-medium text-gray-600">{rx.doctor}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-gray-800">{rx.medication}</p>
                                            <p className="text-xs text-gray-500 truncate max-w-[200px] mt-1">{rx.instructions}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider
                                                ${rx.status === 'Verified' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                                    rx.status === 'Dispensed' ? 'bg-green-50 text-green-700 border border-green-100' :
                                                        rx.status === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-100' :
                                                            'bg-yellow-50 text-yellow-700 border border-yellow-100'}
                                            `}>
                                                {rx.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => handleViewDetails(rx)}
                                                className={`text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm
                                                    ${rx.status === 'Pending' ? 'bg-[#E10600] text-white hover:bg-red-700' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}
                                                `}
                                            >
                                                {rx.status === 'Pending' ? 'Process' : 'View Details'}
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

export default PharmacistPrescriptions;
