import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './pages/auth/Login'
import ProtectedRoute from './routes/ProtectedRoute'

import PatientLayout from './pages/patient/PatientLayout'
import PatientDashboard from './pages/patient/PatientDashboard'
import BookAppointment from './pages/patient/BookAppointment'
import PatientRecords from './pages/patient/PatientRecords'
import PatientConsultations from './pages/patient/PatientConsultations'

import DoctorLayout from './pages/doctor/DoctorLayout'
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import DoctorSchedule from './pages/doctor/DoctorSchedule'
import DoctorPrescriptions from './pages/doctor/DoctorPrescriptions'
import DoctorPatientRecords from './pages/doctor/DoctorPatientRecords'
import ComingSoon from './pages/common/ComingSoon'

import PharmacistLayout from './pages/pharmacist/PharmacistLayout'
import PharmacistDashboard from './pages/pharmacist/PharmacistDashboard'
import PharmacistPrescriptions from './pages/pharmacist/PharmacistPrescriptions'
import PharmacistInventory from './pages/pharmacist/PharmacistInventory'
import PharmacistOrders from './pages/pharmacist/PharmacistOrders'
import PharmacistProfile from './pages/pharmacist/PharmacistProfile'

import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPatients from './pages/admin/AdminPatients'
import AdminDoctors from './pages/admin/AdminDoctors'
import AdminPharmacies from './pages/admin/AdminPharmacies'
import AdminAppointments from './pages/admin/AdminAppointments'
import AdminPrescriptions from './pages/admin/AdminPrescriptions'
import AdminSettings from './pages/admin/AdminSettings'
import AdminLogs from './pages/admin/AdminLogs'

function App() {
  const { user, logout } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <main className="h-full">
          <Routes>
            <Route path="/" element={<Navigate to="/auth/login" replace />} />

            {/* Public Routes */}
            <Route
              path="/auth/login"
              element={user ? <Navigate to={`/${user.role === 'pharmacist' ? 'pharmacy' : user.role}/dashboard`} replace /> : <Login />}
            />

            {/* Protected Role Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="patients" element={<AdminPatients />} />
              <Route path="doctors" element={<AdminDoctors />} />
              <Route path="pharmacies" element={<AdminPharmacies />} />
              <Route path="appointments" element={<AdminAppointments />} />
              <Route path="prescriptions" element={<AdminPrescriptions />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="logs" element={<AdminLogs />} />
            </Route>

            <Route path="/doctor" element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <DoctorLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DoctorDashboard />} />
              <Route path="schedule" element={<DoctorSchedule />} />
              <Route path="patients" element={<DoctorPatientRecords />} />
              <Route path="prescriptions" element={<DoctorPrescriptions />} />
              <Route path="consultation-room" element={<ComingSoon moduleName="Virtual Consultation Module" />} />
              <Route path="records" element={<ComingSoon moduleName="Medical Records Module" />} />
              <Route path="history" element={<ComingSoon moduleName="Consultation History" />} />
              <Route path="settings" element={<ComingSoon moduleName="Availability Settings" />} />
            </Route>

            <Route path="/patient" element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PatientLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<PatientDashboard />} />
              <Route path="appointments" element={<BookAppointment />} />
              <Route path="records" element={<PatientRecords />} />
              <Route path="consultations" element={<PatientConsultations />} />
            </Route>

            <Route path="/pharmacy" element={
              <ProtectedRoute allowedRoles={['pharmacist']}>
                <PharmacistLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<PharmacistDashboard />} />
              <Route path="prescriptions" element={<PharmacistPrescriptions />} />
              <Route path="inventory" element={<PharmacistInventory />} />
              <Route path="orders" element={<PharmacistOrders />} />
              <Route path="profile" element={<PharmacistProfile />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
