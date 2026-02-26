import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

const BookAppointment = () => {
    const { addAppointment } = useOutletContext();
    const navigate = useNavigate();

    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const doctors = [
        { id: 'd1', name: 'Dr. Sarah Jenkins', specialty: 'General Practice', department: 'general' },
        { id: 'd2', name: 'Dr. Michael Chen', specialty: 'Cardiology', department: 'cardiology' },
        { id: 'd3', name: 'Dr. Emily Rodriguez', specialty: 'Dermatology', department: 'dermatology' },
    ];

    // Filter doctors based on department
    const filteredDoctors = selectedDepartment
        ? doctors.filter(doc => doc.department === selectedDepartment)
        : doctors;

    const handleBooking = (e) => {
        e.preventDefault();
        const doc = doctors.find(d => d.id === selectedDoctor);
        if (doc) {
            addAppointment({
                doctor: doc.name,
                date: selectedDate, // In real app, format this nicely
                time: selectedTime,
                type: "Virtual", // Mocking default to Virtual for now
                status: "Upcoming"
            });
            alert(`Appointment successfully booked with ${doc.name}!`);
            navigate('/patient/dashboard');
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 tracking-tight">Book an Appointment</h2>

            <div className="bg-white border rounded-2xl shadow-sm p-6 lg:p-8">
                <form onSubmit={handleBooking} className="space-y-8">

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Department / Specialty</label>
                        <select
                            value={selectedDepartment}
                            onChange={(e) => {
                                setSelectedDepartment(e.target.value);
                                setSelectedDoctor(''); // Reset chosen doctor if department changes
                            }}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all cursor-pointer"
                        >
                            <option value="">All Specialties</option>
                            <option value="general">General Practice</option>
                            <option value="cardiology">Cardiology</option>
                            <option value="dermatology">Dermatology</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Select Doctor</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredDoctors.map(doctor => (
                                <div
                                    key={doctor.id}
                                    onClick={() => setSelectedDoctor(doctor.id)}
                                    className={`border rounded-xl p-4 cursor-pointer transition-all ${selectedDoctor === doctor.id ? 'border-red-500 bg-red-50 ring-1 ring-red-500 shadow-sm' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                            {doctor.name.charAt(4)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">{doctor.name}</p>
                                            <p className="text-xs text-gray-500 font-medium">{doctor.specialty}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {filteredDoctors.length === 0 && (
                                <div className="col-span-1 border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500">
                                    No doctors found for this specialty.
                                </div>
                            )}
                        </div>
                    </div>

                    {selectedDoctor && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Select Date</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all cursor-pointer"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Time Slot</label>
                                <select
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all cursor-pointer"
                                    required
                                >
                                    <option value="">Select Time</option>
                                    <option value="09:00 AM">09:00 AM</option>
                                    <option value="09:30 AM">09:30 AM</option>
                                    <option value="10:00 AM">10:00 AM</option>
                                    <option value="11:00 AM">11:00 AM</option>
                                    <option value="02:00 PM">02:00 PM</option>
                                </select>
                            </div>
                        </div>
                    )}

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={!selectedDoctor || !selectedDate || !selectedTime}
                            className="w-full bg-red-600 text-white font-semibold py-3.5 rounded-xl hover:bg-red-700 active:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                            Confirm Appointment Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookAppointment;
