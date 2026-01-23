import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/app/context/AuthContext';
import { FloatingAIChat } from '@/app/components/FloatingAIChat';

// Customer Pages
import { SplashScreen } from '@/app/pages/customer/SplashScreen';
import { WelcomeScreen } from '@/app/pages/customer/WelcomeScreen';
import { LoginScreen } from '@/app/pages/customer/LoginScreen';
import { SignUpScreen } from '@/app/pages/customer/SignUpScreen';
import { HomeScreen } from '@/app/pages/customer/HomeScreen';
import { DoctorsListScreen } from '@/app/pages/customer/DoctorsListScreen';
import { DoctorDetailScreen } from '@/app/pages/customer/DoctorDetailScreen';
import { MyProfileScreen } from '@/app/pages/customer/MyProfileScreen';
import { AppointmentsScreen } from '@/app/pages/customer/AppointmentsScreen';
import { ViewResultsScreen } from '@/app/pages/customer/ViewResultsScreen';
import { PaymentMethodsScreen } from '@/app/pages/customer/PaymentMethodsScreen';
import { DoctorScheduleScreen } from '@/app/pages/customer/DoctorScheduleScreen';

// Admin Pages
import { AdminDashboard } from '@/app/pages/admin/AdminDashboard';
import { UserManagement } from '@/app/pages/admin/UserManagement';
import { BookingsManagement } from '@/app/pages/admin/BookingsManagement';
import { ResultsManagement } from '@/app/pages/admin/ResultsManagement';
import { InventoryManagement } from '@/app/pages/admin/InventoryManagement';
import { ReportsPage } from '@/app/pages/admin/ReportsPage';

const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode; adminOnly?: boolean }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />

        {/* Customer Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <DoctorsListScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/:id"
          element={
            <ProtectedRoute>
              <DoctorDetailScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule/:id"
          element={
            <ProtectedRoute>
              <DoctorScheduleScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <AppointmentsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MyProfileScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <ViewResultsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <PaymentMethodsScreen />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute adminOnly>
              <BookingsManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/results"
          element={
            <ProtectedRoute adminOnly>
              <ResultsManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/inventory"
          element={
            <ProtectedRoute adminOnly>
              <InventoryManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute adminOnly>
              <ReportsPage />
            </ProtectedRoute>
          }
        />

        {/* Redirect based on auth status */}
        <Route
          path="*"
          element={
            isAuthenticated ? (
              isAdmin ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/home" replace />
              )
            ) : (
              <Navigate to="/welcome" replace />
            )
          }
        />
      </Routes>
      
      {/* Show AI Chat only for authenticated users */}
      {isAuthenticated && <FloatingAIChat />}
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
