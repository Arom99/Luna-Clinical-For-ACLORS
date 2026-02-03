import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface UserProfile {
  email: string;
  name: string;
  phone: string;
  countryCode: string;
  medicalNumber: string;
  insuranceProvider: string;
  insuranceNumber: string;
  dateOfBirth: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  locationId: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  amount: number;
  notes?: string;
}

export interface Notification {
  id: string;
  type: 'appointment' | 'result' | 'reminder' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  appointmentId?: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  appointmentReminders: boolean;
  resultNotifications: boolean;
  promotionalEmails: boolean;
  reminderTiming: number; // hours before appointment
}

interface AppContextType {
  userProfile: UserProfile | null;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  cancelAppointment: (id: string) => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadCount: number;
  notificationSettings: NotificationSettings;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      doctorId: '1',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Pathologist',
      date: '2026-02-05',
      time: '10:00 AM',
      location: 'Luna Clinical - Sydney CBD',
      locationId: '1',
      status: 'upcoming',
      paymentStatus: 'paid',
      amount: 150,
    },
    {
      id: '2',
      doctorId: '2',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Lab Director',
      date: '2026-01-15',
      time: '2:30 PM',
      location: 'Luna Clinical - Parramatta',
      locationId: '2',
      status: 'completed',
      paymentStatus: 'paid',
      amount: 200,
    },
  ]);
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'result',
      title: 'Blood Test Results Ready',
      message: 'Your recent blood test results are now available',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Appointment Reminder',
      message: 'You have an appointment with Dr. Sarah Johnson tomorrow at 10:00 AM',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: false,
      appointmentId: '1',
    },
  ]);

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    appointmentReminders: true,
    resultNotifications: true,
    promotionalEmails: false,
    reminderTiming: 24,
  });

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => (prev ? { ...prev, ...profile } : null));
  };

  const addAppointment = (appointment: Appointment) => {
    setAppointments((prev) => [...prev, appointment]);
    
    // Add notification for new appointment
    addNotification({
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: `Your appointment with ${appointment.doctorName} on ${appointment.date} at ${appointment.time} has been confirmed.`,
    });
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt))
    );
    
    // Add notification for rescheduled appointment
    if (updates.date || updates.time) {
      const apt = appointments.find(a => a.id === id);
      if (apt) {
        addNotification({
          type: 'appointment',
          title: 'Appointment Rescheduled',
          message: `Your appointment with ${apt.doctorName} has been rescheduled to ${updates.date || apt.date} at ${updates.time || apt.time}.`,
        });
      }
    }
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: 'cancelled' as const, paymentStatus: 'refunded' as const } : apt
      )
    );
    
    const apt = appointments.find(a => a.id === id);
    if (apt) {
      addNotification({
        type: 'appointment',
        title: 'Appointment Cancelled',
        message: `Your appointment with ${apt.doctorName} has been cancelled. Refund will be processed within 3-5 business days.`,
      });
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const updateNotificationSettings = (settings: Partial<NotificationSettings>) => {
    setNotificationSettings((prev) => ({ ...prev, ...settings }));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Initialize user profile when email is available (from AuthContext)
  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail && !userProfile) {
      setUserProfile({
        email: storedEmail,
        name: 'Patient User',
        phone: '412345678',
        countryCode: '+61',
        medicalNumber: '1234 56789 0',
        insuranceProvider: 'Medicare',
        insuranceNumber: 'MED-123456',
        dateOfBirth: '1990-01-01',
        address: '123 Health St, Sydney NSW 2000',
        emergencyContact: 'Jane Doe',
        emergencyPhone: '+61 400 000 000',
      });
    }
  }, [userProfile]);

  return (
    <AppContext.Provider
      value={{
        userProfile,
        updateUserProfile,
        appointments,
        addAppointment,
        updateAppointment,
        cancelAppointment,
        notifications,
        addNotification,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadCount,
        notificationSettings,
        updateNotificationSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
