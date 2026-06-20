import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from '@/pages/customer/auth/LoginPage';
import RegisterPage from "@/pages/customer/auth/RegisterPage.tsx";
import {ProtectedRoute} from "@/routes/ProtectedRoute.tsx";
import DashboardPage from "@/pages/customer/DashboardPage.tsx";
import StaffLoginPage from "@/pages/staff/auth/StaffLoginPage.tsx";
import DoctorDashboardPage from "@/pages/staff/doctor/DoctorDashboardPage.tsx";
import DoctorReservationsPage from "@/pages/staff/doctor/DoctorReservationsPage.tsx";
import MedicalRecordPage from "@/pages/staff/doctor/MedicalRecordPage.tsx";
import ProfilePage from "@/pages/customer/ProfilePage.tsx";
import ReservationsPage from "@/pages/customer/ReservationsPage.tsx";
import ShopPage from "@/pages/customer/ShopPage.tsx";
import TransactionsPage from "@/pages/customer/TransactionsPage.tsx";
import {PublicRoute} from "@/routes/PublicRoute.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/*Customer*/}
                <Route path="/login" element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } />
                <Route path="/register" element={
                    <PublicRoute>
                        <RegisterPage />
                    </PublicRoute>
                } />

                <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
                />
                <Route path="/reservations" element={
                    <ProtectedRoute>
                        <ReservationsPage />
                    </ProtectedRoute>
                }
                />
                <Route path="/shop" element={
                    <ProtectedRoute>
                        <ShopPage />
                    </ProtectedRoute>
                }
                />
                <Route path="/transactions" element={
                    <ProtectedRoute>
                        <TransactionsPage />
                    </ProtectedRoute>
                }
                />

                {/*Staff*/}
                <Route path="/staff/login" element={<StaffLoginPage />} />

                <Route
                    path="/cashier/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["Cashier"]}>
                            <DoctorDashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cashier/transactions"
                    element={
                        <ProtectedRoute allowedRoles={["Cashier"]}>
                            <DoctorReservationsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cashier/confirmation"
                    element={
                        <ProtectedRoute allowedRoles={["Cashier"]}>
                            <MedicalRecordPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/doctor/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["Doctor"]}>
                            <DoctorDashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/doctor/reservations"
                    element={
                        <ProtectedRoute allowedRoles={["Doctor"]}>
                            <DoctorReservationsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/doctor/medical-record"
                    element={
                        <ProtectedRoute allowedRoles={["Doctor"]}>
                            <MedicalRecordPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/groomer/dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["Groomer"]}>
                            <DoctorDashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/groomer/reservations"
                    element={
                        <ProtectedRoute allowedRoles={["Groomer"]}>
                            <DoctorReservationsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/groomer/grooming-record"
                    element={
                        <ProtectedRoute allowedRoles={["Groomer"]}>
                            <MedicalRecordPage />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;