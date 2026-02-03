import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Calendar } from '@/app/components/ui/calendar';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ArrowLeft, CheckCircle, XCircle, Calendar as CalendarIcon, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface Booking {
  id: number;
  patient: string;
  patientEmail: string;
  doctor: string;
  date: string;
  time: string;
  status: 'Pending' | 'Approved' | 'Completed' | 'Cancelled';
  test: string;
  amount: number;
}

export const BookingsManagement = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const [bookings, setBookings] = useState<Booking[]>([
    { id: 1, patient: 'John Doe', patientEmail: 'john@example.com', doctor: 'Dr. Sarah Johnson', date: '2026-02-05', time: '10:00 AM', status: 'Approved', test: 'Blood Test', amount: 150 },
    { id: 2, patient: 'Jane Smith', patientEmail: 'jane@example.com', doctor: 'Dr. Michael Chen', date: '2026-02-06', time: '2:30 PM', status: 'Pending', test: 'Lipid Panel', amount: 200 },
    { id: 3, patient: 'Mike Johnson', patientEmail: 'mike@example.com', doctor: 'Dr. Emma Williams', date: '2026-02-07', time: '9:00 AM', status: 'Pending', test: 'Glucose Test', amount: 120 },
    { id: 4, patient: 'Sarah Davis', patientEmail: 'sarah@example.com', doctor: 'Dr. David Brown', date: '2026-02-08', time: '11:30 AM', status: 'Completed', test: 'Complete Blood Count', amount: 180 },
  ]);

  const handleApprove = (id: number) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: 'Approved' as const } : b
    ));
    toast.success('Booking approved successfully!');
  };

  const handleCancel = (id: number) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: 'Cancelled' as const } : b
    ));
    toast.success('Booking cancelled');
  };

  const handleComplete = (id: number) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: 'Completed' as const } : b
    ));
    toast.success('Booking marked as completed');
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.test.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    approved: bookings.filter(b => b.status === 'Approved').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
    revenue: bookings.filter(b => b.status === 'Completed').reduce((sum, b) => sum + b.amount, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => navigate('/admin')} className="flex items-center gap-2 mb-4 text-[#A9A9A9] hover:text-[#333333]">
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1>Bookings Management</h1>
          <p className="text-sm text-[#A9A9A9] mt-1">View and manage all appointment bookings</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <p className="text-sm text-[#A9A9A9] mb-1">Total Bookings</p>
            <p className="text-2xl font-semibold">{stats.total}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 shadow-sm border border-yellow-200">
            <p className="text-sm text-yellow-700 mb-1">Pending</p>
            <p className="text-2xl font-semibold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 shadow-sm border border-green-200">
            <p className="text-sm text-green-700 mb-1">Approved</p>
            <p className="text-2xl font-semibold text-green-600">{stats.approved}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-200">
            <p className="text-sm text-blue-700 mb-1">Completed</p>
            <p className="text-2xl font-semibold text-blue-600">{stats.completed}</p>
          </div>
          <div className="bg-[#FFC0CB] bg-opacity-20 rounded-lg p-4 shadow-sm border border-[#FFC0CB]">
            <p className="text-sm text-[#FFC0CB] mb-1">Revenue</p>
            <p className="text-2xl font-semibold text-[#FFC0CB]">${stats.revenue}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar & Filters */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="mb-4">Select Date</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h2 className="mb-4">Filters</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-[#A9A9A9] mb-2 block">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A9A9A9]" size={16} />
                  <Input
                    placeholder="Search bookings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bookings List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center shadow-sm border border-gray-200">
                <CalendarIcon size={48} className="mx-auto text-[#A9A9A9] mb-4" />
                <p className="text-[#A9A9A9]">No bookings found</p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="mb-1">Booking #{booking.id.toString().padStart(4, '0')}</h3>
                      <p className="text-sm text-[#A9A9A9]">{booking.test}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'Approved'
                        ? 'bg-green-100 text-green-600'
                        : booking.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-600'
                        : booking.status === 'Completed'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-[#A9A9A9] text-xs mb-1">Patient</p>
                      <p className="font-medium">{booking.patient}</p>
                      <p className="text-xs text-[#A9A9A9]">{booking.patientEmail}</p>
                    </div>
                    <div>
                      <p className="text-[#A9A9A9] text-xs mb-1">Doctor</p>
                      <p className="font-medium">{booking.doctor}</p>
                    </div>
                    <div>
                      <p className="text-[#A9A9A9] text-xs mb-1">Date & Time</p>
                      <p className="flex items-center gap-1 font-medium">
                        <CalendarIcon size={14} />
                        {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                      <p className="text-xs text-[#A9A9A9]">{booking.time}</p>
                    </div>
                    <div>
                      <p className="text-[#A9A9A9] text-xs mb-1">Amount</p>
                      <p className="font-medium text-[#FFC0CB]">${booking.amount}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {booking.status === 'Pending' && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => handleApprove(booking.id)}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                        >
                          <CheckCircle size={16} className="mr-2" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleCancel(booking.id)}
                          variant="outline" 
                          className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <XCircle size={16} className="mr-2" />
                          Cancel
                        </Button>
                      </>
                    )}
                    {booking.status === 'Approved' && (
                      <Button 
                        size="sm" 
                        onClick={() => handleComplete(booking.id)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <CheckCircle size={16} className="mr-2" />
                        Mark as Completed
                      </Button>
                    )}
                    {(booking.status === 'Completed' || booking.status === 'Cancelled') && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full"
                        disabled
                      >
                        {booking.status}
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
