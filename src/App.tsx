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

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/*Customer*/}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route path="/pets" element={
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
                        <ProtectedRoute>
                            <DoctorDashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cashier/transactions"
                    element={
                        <ProtectedRoute>
                            <DoctorReservationsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cashier/confirmation"
                    element={
                        <ProtectedRoute>
                            <MedicalRecordPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/doctor/dashboard"
                    element={
                        <ProtectedRoute>
                            <DoctorDashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/doctor/reservations"
                    element={
                        <ProtectedRoute>
                            <DoctorReservationsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/doctor/medical-record"
                    element={
                        <ProtectedRoute>
                            <MedicalRecordPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/groomer/dashboard"
                    element={
                        <ProtectedRoute>
                            <DoctorDashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/groomer/reservations"
                    element={
                        <ProtectedRoute>
                            <DoctorReservationsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/groomer/medical-record"
                    element={
                        <ProtectedRoute>
                            <MedicalRecordPage />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;