import { useState } from 'react';

const PharmacistProfile = () => {
    const [profile, setProfile] = useState({
        pharmacyName: "CVS Pharmacy #4192",
        licenseNumber: "RX-982-411A",
        phone: "+1 (555) 123-4567",
        email: "contact@cvs4192.healthcore",
        address: "742 Evergreen Terrace, Springfield, IL 62704",
        operatingHours: "Mon-Sat: 8AM - 8PM, Sun: 9AM - 5PM"
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState(profile);

    const handleSave = (e) => {
        e.preventDefault();
        setProfile(editForm);
        setIsEditing(false);
    };

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight mb-6">Pharmacy Profile</h2>

            <div className="bg-white border text-gray-800 border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-red-600 to-red-800 relative">
                    <div className="absolute -bottom-12 left-8 p-1 bg-white rounded-2xl w-24 h-24 shadow-sm flex items-center justify-center">
                        <div className="w-full h-full bg-red-50 rounded-xl flex items-center justify-center">
                            <svg className="w-10 h-10 text-[#E10600]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        </div>
                    </div>
                </div>

                <div className="pt-16 p-8">
                    {!isEditing ? (
                        <>
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800">{profile.pharmacyName}</h3>
                                    <p className="text-gray-500 font-medium">License: {profile.licenseNumber}</p>
                                </div>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition shadow-sm"
                                >
                                    Edit Profile
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Contact Information</p>
                                        <div className="space-y-3 mt-3">
                                            <div className="flex items-center gap-3 text-gray-700">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                                <span className="font-medium">{profile.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-700">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                                <span className="font-medium">{profile.email}</span>
                                            </div>
                                            <div className="flex items-start gap-3 text-gray-700">
                                                <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                                <span className="font-medium">{profile.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Operating Hours</p>
                                        <div className="flex items-start gap-3 text-gray-700 mt-3">
                                            <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <span className="font-medium">{profile.operatingHours}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <form onSubmit={handleSave} className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Edit Profile Operations</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Pharmacy Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.pharmacyName}
                                        onChange={e => setEditForm(prev => ({ ...prev, pharmacyName: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500 font-medium text-gray-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">License Number</label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.licenseNumber}
                                        onChange={e => setEditForm(prev => ({ ...prev, licenseNumber: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500 font-medium text-gray-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.phone}
                                        onChange={e => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500 font-medium text-gray-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={editForm.email}
                                        onChange={e => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500 font-medium text-gray-800"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.address}
                                        onChange={e => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500 font-medium text-gray-800"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Operating Hours</label>
                                    <input
                                        type="text"
                                        required
                                        value={editForm.operatingHours}
                                        onChange={e => setEditForm(prev => ({ ...prev, operatingHours: e.target.value }))}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500 font-medium text-gray-800"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditForm(profile);
                                        setIsEditing(false);
                                    }}
                                    className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition shadow-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-[#E10600] text-white font-bold rounded-xl hover:bg-red-700 transition shadow-sm"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PharmacistProfile;
