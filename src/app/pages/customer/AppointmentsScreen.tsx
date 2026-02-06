import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Calendar } from '@/app/components/ui/calendar';
import { ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, FileText, RefreshCw, Trash2, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export const AppointmentsScreen = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Reschedule Modal State
  const [showReschedule, setShowReschedule] = useState(false);
  const [selectedAptId, setSelectedAptId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState<Date | undefined>(new Date());
  const [newTime, setNewTime] = useState('');
  
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const fetchAppointments = () => {
    fetch('http://localhost:5000/appointments')
      .then(res => res.json())
      .then(data => { setAppointments(data); setLoading(false); });
  };

  useEffect(() => { fetchAppointments(); }, []);

  const handleCancel = async (id: string) => {
    if(!confirm("Are you sure you want to cancel?")) return;
    await fetch(`http://localhost:5000/appointments/${id}`, { method: 'DELETE' });
    toast.success("Appointment cancelled.");
    fetchAppointments();
  };

  const openRescheduleModal = (id: string) => {
    setSelectedAptId(id);
    setShowReschedule(true);
    setNewTime('');
  };

  const confirmReschedule = async () => {
    if (!newDate || !newTime || !selectedAptId) {
      toast.error("Please select date and time");
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/appointments/${selectedAptId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          date: format(newDate, 'MMM dd, yyyy'),
          time: newTime 
        })
      });
      if (res.ok) {
        toast.success("Rescheduled Successfully!");
        setShowReschedule(false);
        fetchAppointments();
      }
    } catch (e) { toast.error("Connection Error"); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#FFC0CB] text-white p-6">
        <div className="container mx-auto max-w-4xl">
          <button onClick={() => navigate('/home')} className="flex items-center gap-2 mb-2"><ArrowLeft size={20}/> Back</button>
          <h1 className="text-2xl font-bold">My Appointments</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {loading ? <div className="text-center py-10">Loading...</div> : appointments.map((apt) => (
          <div key={apt._id} className="bg-white rounded-lg shadow-sm p-5 border border-gray-200 mb-4 transition-all hover:shadow-md">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg">{apt.doctorName}</h3>
                <p className="text-gray-500 text-sm">{apt.specialty}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold h-fit ${
                apt.status === 'ResultsReady' ? 'bg-green-100 text-green-700' : 
                apt.status === 'Completed' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {apt.status === 'ResultsReady' ? 'RESULTS READY' : apt.status.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2"><CalendarIcon size={16}/> {apt.date}</div>
              <div className="flex items-center gap-2"><Clock size={16}/> {apt.time}</div>
              <div className="flex items-center gap-2"><MapPin size={16}/> {apt.location}</div>
            </div>

            <div className="flex gap-3 pt-3 border-t">
              {apt.status === 'ResultsReady' ? (
                <Button onClick={() => navigate('/results')} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <FileText size={16} className="mr-2"/> View Results
                </Button>
              ) : apt.status === 'Completed' ? (
                 <div className="w-full text-center text-sm text-gray-500 py-2 bg-gray-50 rounded flex items-center justify-center gap-2">
                   <AlertCircle size={16}/> Waiting for Lab Results...
                 </div>
              ) : (
                <>
                  <Button onClick={() => openRescheduleModal(apt._id)} variant="outline" className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50">
                    <RefreshCw size={16} className="mr-2"/> Reschedule
                  </Button>
                  <Button onClick={() => handleCancel(apt._id)} variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50">
                    <Trash2 size={16} className="mr-2"/> Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
        {appointments.length === 0 && <div className="text-center text-gray-500 py-10">No appointments found.</div>}
      </div>

      {/* --- PINK THEMED RESCHEDULE MODAL --- */}
      {showReschedule && (
        <div className="fixed inset-0 bg-[#FFC0CB]/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-pink-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-gray-800">Select New Date & Time</h3>
              <button onClick={() => setShowReschedule(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
            </div>
            
            <div className="bg-pink-50 p-4 rounded-lg mb-4 flex justify-center">
              <Calendar mode="single" selected={newDate} onSelect={setNewDate} className="rounded-md border bg-white shadow-sm" disabled={(d) => d < new Date()}/>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {timeSlots.map(time => (
                <button 
                  key={time} 
                  onClick={() => setNewTime(time)}
                  className={`p-2 text-sm rounded border transition-colors ${newTime === time ? 'bg-[#FFC0CB] text-white border-[#FFC0CB]' : 'hover:border-[#FFC0CB] border-gray-200'}`}
                >
                  {time}
                </button>
              ))}
            </div>

            <Button onClick={confirmReschedule} disabled={!newTime} className="w-full bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white h-11 text-lg">
              Confirm Change
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};