import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AuthProvider, useAuth } from '@/app/context/AuthContext';
import { AppProvider } from '@/app/context/AppContext';
import { FloatingAIChat } from '@/app/components/FloatingAIChat';
import { Toaster } from '@/app/components/ui/sonner';

// Customer Pages
import { SplashScreen } from '@/app/pages/customer/SplashScreen';
import { TestConnection } from '@/app/pages/customer/TestConnection';
import { WelcomeScreen } from '@/app/pages/customer/WelcomeScreen';
import { LoginScreen } from '@/app/pages/customer/LoginScreen';
import { SignUpScreen } from '@/app/pages/customer/SignUpScreen';
import { HomeScreen } from '@/app/pages/customer/HomeScreen';
import { DoctorsListScreen } from '@/app/pages/customer/DoctorsListScreen';
import { DoctorDetailScreen } from '@/app/pages/customer/DoctorDetailScreen';
import { DoctorChatScreen } from '@/app/pages/customer/DoctorChatScreen';
import { MyProfileScreen } from '@/app/pages/customer/MyProfileScreen';
import { EditProfileScreen } from '@/app/pages/customer/EditProfileScreen';
import { NotificationsScreen } from '@/app/pages/customer/NotificationsScreen';
import { AppointmentsScreen } from '@/app/pages/customer/AppointmentsScreen';
import { ViewResultsScreen } from '@/app/pages/customer/ViewResultsScreen';
import { PaymentMethodsScreen } from '@/app/pages/customer/PaymentMethodsScreen';
import { DoctorScheduleScreen } from '@/app/pages/customer/DoctorScheduleScreen';
import { AboutUsScreen } from '@/app/pages/customer/AboutUsScreen';
import { PrivacyPolicyScreen } from '@/app/pages/customer/PrivacyPolicyScreen';
import { ContactUsScreen } from '@/app/pages/customer/ContactUsScreen';
import { LocationsScreen } from '@/app/pages/customer/LocationsScreen';
import { BookAppointmentScreen } from '@/app/pages/customer/BookAppointmentScreen';

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
              <BookAppointmentScreen />
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
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfileScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsScreen />
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
        <Route
          path="/about-us"
          element={
            <ProtectedRoute>
              <AboutUsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <ProtectedRoute>
              <PrivacyPolicyScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact-us"
          element={
            <ProtectedRoute>
              <ContactUsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/locations"
          element={
            <ProtectedRoute>
              <LocationsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-appointment"
          element={
            <ProtectedRoute>
              <BookAppointmentScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-chat/:id"
          element={
            <ProtectedRoute>
              <DoctorChatScreen />
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
      <Toaster />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}