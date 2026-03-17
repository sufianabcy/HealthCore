# HealthCore Medical System (Frontend)

Welcome to the **HealthCore Medical System** frontend repository! This is a modern, responsive React application built with Vite and Tailwind CSS. It is designed to handle multiple user roles (Patients, Doctors, Pharmacists, and Admins) navigating a unified healthcare platform.

## 🚀 Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Routing:** React Router DOM (v7)
- **Styling:** Tailwind CSS (v4)
- **State Management:** React Context API (Auth Context & Outlet Context)
- **Linting:** ESLint

## 📁 Project Structure

```text
sdp-frontend/
├── public/                 # Static assets (favicon, etc.)
└── src/
    ├── assets/             # Images, fonts, SVG icons
    ├── components/         # Reusable UI components (buttons, inputs)
    ├── context/            # React Context providers (AuthContext)
    ├── pages/              # Role-specific dashboard pages
    │   ├── admin/          # Admin views (Patients, Settings, Logs)
    │   ├── auth/           # Login & Registration flows
    │   ├── doctor/         # Doctor views (Schedule, Prescriptions)
    │   ├── patient/        # Patient views (Appointments, Records)
    │   └── pharmacist/     # Pharmacy views (Inventory, Orders)
    ├── routes/             # Route guards (ProtectedRoute.jsx)
    ├── App.jsx             # Main router configuration
    ├── index.css           # Global Tailwind and base styles
    └── main.jsx            # React mounting point
```

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have **Node.js** installed (v18+ recommended).

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd sdp-frontend
   ```

2. Install NPM packages:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`.

## 🔐 Demo Credentials

The application currently uses a mocked authentication system. You can log in using any of the following credentials (Password is always `123456`):
- **Patient:** `patient@test.com`
- **Doctor:** `doctor@test.com`
- **Pharmacy:** `pharmacy@test.com`
- **Admin:** `admin@test.com`
