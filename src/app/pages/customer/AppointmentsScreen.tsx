import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, Calendar, Clock, MapPin, Star } from 'lucide-react';

const appointments = [
  {
    id: 1,
    doctor: 'Dr. Sarah Johnson',
    specialty: 'Pathologist',
    date: 'Jan 25, 2026',
    time: '10:00 AM',
    location: 'Sydney CBD',
    status: 'upcoming',
  },
  {
    id: 2,
    doctor: 'Dr. Michael Chen',
    specialty: 'Lab Director',
    date: 'Jan 15, 2026',
    time: '2:30 PM',
    location: 'Parramatta',
    status: 'completed',
  },
];

export const AppointmentsScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#FFC0CB] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => navigate('/home')} className="flex items-center gap-2 mb-2">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-white">My Appointments</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 max-w-4xl">
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-[#ADD8E6] rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨‍⚕️</span>
                  </div>
                  <div>
                    <h3>{apt.doctor}</h3>
                    <p className="text-sm text-[#A9A9A9]">{apt.specialty}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  apt.status === 'upcoming'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {apt.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-2 text-[#A9A9A9]">
                  <Calendar size={16} />
                  <span>{apt.date}</span>
                </div>
                <div className="flex items-center gap-2 text-[#A9A9A9]">
                  <Clock size={16} />
                  <span>{apt.time}</span>
                </div>
                <div className="flex items-center gap-2 text-[#A9A9A9]">
                  <MapPin size={16} />
                  <span>{apt.location}</span>
                </div>
              </div>

              <div className="flex gap-2">
                {apt.status === 'upcoming' ? (
                  <>
                    <Button size="sm" variant="outline" className="flex-1">
                      Reschedule
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-red-600 border-red-200">
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => navigate('/results')}>
                      View Results
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Star size={16} className="mr-1" />
                      Review
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
