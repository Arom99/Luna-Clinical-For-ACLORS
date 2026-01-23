import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Calendar } from '@/app/components/ui/calendar';
import { ArrowLeft, CheckCircle, XCircle, Calendar as CalendarIcon } from 'lucide-react';

const bookings = [
  { id: 1, patient: 'John Doe', doctor: 'Dr. Sarah Johnson', date: 'Jan 25, 2026', time: '10:00 AM', status: 'Pending', test: 'Blood Test' },
  { id: 2, patient: 'Jane Smith', doctor: 'Dr. Michael Chen', date: 'Jan 26, 2026', time: '2:30 PM', status: 'Approved', test: 'Lipid Panel' },
  { id: 3, patient: 'Mike Johnson', doctor: 'Dr. Emma Williams', date: 'Jan 27, 2026', time: '9:00 AM', status: 'Pending', test: 'Glucose Test' },
];

export const BookingsManagement = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => navigate('/admin')} className="flex items-center gap-2 mb-4 text-[#A9A9A9] hover:text-[#333333]">
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1>Bookings Management</h1>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="mb-4">Select Date</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
            />
          </div>

          {/* Bookings List */}
          <div className="lg:col-span-2 space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="mb-1">Booking #{booking.id}</h3>
                    <p className="text-sm text-[#A9A9A9]">{booking.test}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    booking.status === 'Approved'
                      ? 'bg-green-100 text-green-600'
                      : booking.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-[#A9A9A9]">Patient</p>
                    <p>{booking.patient}</p>
                  </div>
                  <div>
                    <p className="text-[#A9A9A9]">Doctor</p>
                    <p>{booking.doctor}</p>
                  </div>
                  <div>
                    <p className="text-[#A9A9A9]">Date</p>
                    <p className="flex items-center gap-1">
                      <CalendarIcon size={14} />
                      {booking.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#A9A9A9]">Time</p>
                    <p>{booking.time}</p>
                  </div>
                </div>

                {booking.status === 'Pending' && (
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                      <CheckCircle size={16} className="mr-2" />
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50">
                      <XCircle size={16} className="mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
