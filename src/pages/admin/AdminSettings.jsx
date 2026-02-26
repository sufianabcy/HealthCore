import { useState } from 'react';

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        allowRegistrations: true,
        maintenanceMode: false,
        patientPortalActive: true,
        doctorPortalActive: true,
        pharmacistPortalActive: true,
    });

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 tracking-tight">Platform Configuration</h2>

            <div className="space-y-6">

                {/* Global Security Controls */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="text-lg font-bold text-gray-800">Global Security Controls</h3>
                        <p className="text-sm text-gray-500 mt-1">High-level overrides affecting the entire network.</p>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-gray-800">Enable New Registrations</h4>
                                <p className="text-sm text-gray-500 mt-0.5">Allow new patients and doctors to sign up.</p>
                            </div>
                            <button
                                onClick={() => toggleSetting('allowRegistrations')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${settings.allowRegistrations ? 'bg-green-500' : 'bg-gray-200'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.allowRegistrations ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-[#E10600]">System Maintenance Mode</h4>
                                <p className="text-sm text-gray-500 mt-0.5">Locks out all non-admin accounts immediately.</p>
                            </div>
                            <button
                                onClick={() => toggleSetting('maintenanceMode')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${settings.maintenanceMode ? 'bg-[#E10600]' : 'bg-gray-200'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Portal Access Controls */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="text-lg font-bold text-gray-800">Portal Access Toggles</h3>
                        <p className="text-sm text-gray-500 mt-1">Selectively disable specific subsystems.</p>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-gray-800">Patient Portal</h4>
                                <p className="text-sm text-gray-500 mt-0.5">Enable patient dashboard and appointment booking.</p>
                            </div>
                            <button
                                onClick={() => toggleSetting('patientPortalActive')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${settings.patientPortalActive ? 'bg-blue-500' : 'bg-gray-200'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.patientPortalActive ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-gray-800">Doctor Portal</h4>
                                <p className="text-sm text-gray-500 mt-0.5">Enable e-prescribing and schedule management.</p>
                            </div>
                            <button
                                onClick={() => toggleSetting('doctorPortalActive')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${settings.doctorPortalActive ? 'bg-blue-500' : 'bg-gray-200'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.doctorPortalActive ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                            <div>
                                <h4 className="font-bold text-gray-800">Pharmacy Portal</h4>
                                <p className="text-sm text-gray-500 mt-0.5">Enable prescription fulfillment flows.</p>
                            </div>
                            <button
                                onClick={() => toggleSetting('pharmacistPortalActive')}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${settings.pharmacistPortalActive ? 'bg-blue-500' : 'bg-gray-200'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.pharmacistPortalActive ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminSettings;
