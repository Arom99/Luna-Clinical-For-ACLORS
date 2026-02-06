import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Calendar } from '@/app/components/ui/calendar';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { ArrowLeft, Clock, MapPin, CreditCard, Shield, Plus, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export const BookAppointmentScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  
  // Booking Data
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  // Payment Data
  const [savedCards, setSavedCards] = useState<any[]>([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(-1); // -1 means add new card
  const [isProcessing, setIsProcessing] = useState(false);

  // Slots
  const allSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

  // 1. Fetch Doctor & User Cards
  useEffect(() => {
    // Fetch Doctor
    fetch(`http://localhost:5000/doctors/${id}`)
      .then(res => res.json())
      .then(data => { setDoctor(data); setLoading(false); })
      .catch(() => setLoading(false));

    // Fetch User Cards (Mocking fetching from DB based on logged in user)
    if (user?.email) {
      fetch(`http://localhost:5000/users/email/${user.email}`)
        .then(res => res.json())
        .then(userData => {
          if (userData && userData.savedCards) {
            setSavedCards(userData.savedCards);
            if (userData.savedCards.length > 0) setSelectedCardIndex(0); // Select first card by default
          }
        });
    }
  }, [id, user]);

  // 2. Fetch Slots availability
  useEffect(() => {
    if (doctor && date) {
      const formattedDate = format(date, 'MMM dd, yyyy');
      fetch(`http://localhost:5000/booked-slots?doctorId=${doctor.id}&date=${formattedDate}`)
        .then(res => res.json())
        .then(data => setBookedSlots(data));
    }
  }, [date, doctor]);

  const handleBooking = async () => {
    setIsProcessing(true);
    // Simulate Payment Processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const bookingData = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: format(date!, 'MMM dd, yyyy'),
      time: selectedTime,
      location: doctor.location,
      amount: doctor.consultationFee,
      notes: notes,
      patientName: user?.name || "Guest",
      paymentStatus: 'Paid'
    };

    try {
      const res = await fetch('http://localhost:5000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (res.ok) {
        toast.success("Booking Confirmed! Receipt sent to email.");
        navigate('/appointments');
      } else {
        toast.error("Slot taken! Please check available times.");
      }
    } catch (e) { toast.error("Connection Error"); }
    finally { setIsProcessing(false); }
  };

  if (loading || !doctor) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-[#FFC0CB] text-white p-6">
        <div className="container mx-auto max-w-4xl">
          <button onClick={() => step === 1 ? navigate('/doctors') : setStep(1)} className="flex items-center gap-2 mb-4">
            <ArrowLeft size={20} /> Back
          </button>
          <h1 className="text-2xl font-bold">{step === 1 ? 'Select Time' : 'Payment'}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg p-6">
          {/* Doctor Info */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <div>
              <h3 className="font-bold text-lg">{doctor.name}</h3>
              <p className="text-gray-500">{doctor.specialty}</p>
            </div>
            <p className="text-xl font-bold text-[#FFC0CB]">${doctor.consultationFee}</p>
          </div>

          {step === 1 ? (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Label className="mb-2 block">Date</Label>
                <Calendar mode="single" selected={date} onSelect={setDate} className="border rounded-md w-full" disabled={(d) => d < new Date()} />
              </div>
              <div>
                <Label className="mb-2 block">Available Slots</Label>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {allSlots.map(time => {
                    const isTaken = bookedSlots.includes(time);
                    return (
                      <button key={time} onClick={() => !isTaken && setSelectedTime(time)} disabled={isTaken}
                        className={`p-3 rounded border text-sm ${selectedTime === time ? 'bg-[#FFC0CB] text-white' : isTaken ? 'bg-gray-100 text-gray-400' : 'hover:border-[#FFC0CB]'}`}>
                        {time}
                      </button>
                    )
                  })}
                </div>
                <Label>Notes</Label>
                <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Symptoms..." className="mt-2"/>
                <Button onClick={() => setStep(2)} disabled={!date || !selectedTime} className="w-full mt-6 bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white">Continue</Button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-bold mb-4">Select Payment Method</h3>
              
              {/* Saved Cards List */}
              <div className="space-y-3 mb-6">
                {savedCards.map((card, index) => (
                  <div key={index} onClick={() => setSelectedCardIndex(index)}
                    className={`p-4 border rounded-lg flex items-center justify-between cursor-pointer ${selectedCardIndex === index ? 'border-[#FFC0CB] bg-pink-50 ring-1 ring-[#FFC0CB]' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-3">
                      <CreditCard className="text-gray-600"/>
                      <div>
                        <p className="font-medium">{card.brand} •••• {card.last4}</p>
                        <p className="text-xs text-gray-500">Expires {card.expiry}</p>
                      </div>
                    </div>
                    {selectedCardIndex === index && <CheckCircle className="text-[#FFC0CB]" size={20}/>}
                  </div>
                ))}

                {/* Add New Card Option */}
                <div onClick={() => setSelectedCardIndex(-1)}
                  className={`p-4 border rounded-lg flex items-center gap-3 cursor-pointer ${selectedCardIndex === -1 ? 'border-[#FFC0CB] bg-pink-50' : 'hover:bg-gray-50'}`}>
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"><Plus size={20}/></div>
                  <p className="font-medium">Pay with new card</p>
                </div>
              </div>

              {/* Show Card Form ONLY if "New Card" selected */}
              {selectedCardIndex === -1 && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6 border animate-in fade-in">
                  <Label>Card Number</Label>
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-2 border rounded mt-1 mb-3"/>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Expiry</Label><input type="text" placeholder="MM/YY" className="w-full p-2 border rounded mt-1"/></div>
                    <div><Label>CVC</Label><input type="text" placeholder="123" className="w-full p-2 border rounded mt-1"/></div>
                  </div>
                </div>
              )}

              <Button onClick={handleBooking} disabled={isProcessing} className="w-full bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white h-12 text-lg">
                {isProcessing ? <Loader2 className="animate-spin"/> : `Pay $${doctor.consultationFee}`}
              </Button>
              <p className="text-center text-xs text-gray-400 mt-4 flex justify-center gap-1"><Shield size={12}/> Secure Payment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};