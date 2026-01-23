import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Calendar } from '@/app/components/ui/calendar';
import { ArrowLeft, Clock } from 'lucide-react';

export const DoctorScheduleScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');

  const availableSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  ];

  const handleConfirm = () => {
    if (date && selectedTime) {
      navigate('/appointments');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#FFC0CB] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => navigate(`/doctor/${id}`)} className="flex items-center gap-2 mb-2">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-white">Schedule Appointment</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="bg-[#ADD8E6] bg-opacity-10 p-6 rounded-lg">
            <h2 className="mb-4">Select Date</h2>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
          </div>

          {/* Time Slots */}
          <div>
            <h2 className="mb-4">Available Times</h2>
            {date ? (
              <div className="grid grid-cols-2 gap-3">
                {availableSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedTime === time
                        ? 'bg-[#FFC0CB] text-white border-[#FFC0CB]'
                        : 'border-gray-200 hover:border-[#FFC0CB]'
                    }`}
                  >
                    <Clock size={16} className="inline mr-2" />
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-[#A9A9A9] text-center py-8">Please select a date first</p>
            )}
          </div>
        </div>

        {/* Summary */}
        {date && selectedTime && (
          <div className="mt-8 bg-[#ADD8E6] bg-opacity-20 p-6 rounded-lg">
            <h3 className="mb-3">Appointment Summary</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Doctor:</strong> Dr. Sarah Johnson</p>
              <p><strong>Date:</strong> {date.toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
              <p><strong>Location:</strong> Luna Clinical - Sydney CBD</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Button
            onClick={() => navigate(`/doctor/${id}`)}
            variant="outline"
            className="flex-1 border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!date || !selectedTime}
            className="flex-1 bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white"
          >
            Confirm Appointment
          </Button>
        </div>
      </div>
    </div>
  );
};
