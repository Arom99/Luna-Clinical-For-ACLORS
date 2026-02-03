import { doctors } from '@/app/data/doctors';
import { Doctor } from '@/app/data/doctors';
import { locations } from '@/app/data/locations';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useApp } from '@/app/context/AppContext';
import { Button } from '@/app/components/ui/button';
import { Calendar } from '@/app/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { ArrowLeft, Clock, MapPin, CreditCard, Shield, DollarSign, Check } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export const BookAppointmentScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addAppointment } = useApp();
  
  const doctor = doctors.find(d => d.id === id);
  
  const [step, setStep] = useState(1); // 1: Location & Time, 2: Payment
  const [selectedLocationId, setSelectedLocationId] = useState(doctor?.locationId || '');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const availableSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  ];

  const selectedLocation = locations.find(l => l.id === selectedLocationId);
  const consultationFee = doctor?.consultationFee || 150;

  const handleContinueToPayment = () => {
    if (!date || !selectedTime || !selectedLocationId) {
      toast.error('Please complete all fields');
      return;
    }
    setStep(2);
  };

  const handleConfirmBooking = () => {
    if (!doctor || !date || !selectedTime || !selectedLocation) return;

    const newAppointment = {
      id: Date.now().toString(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: format(date, 'yyyy-MM-dd'),
      time: selectedTime,
      location: selectedLocation.name,
      locationId: selectedLocation.id,
      status: 'upcoming' as const,
      paymentStatus: 'paid' as const,
      amount: consultationFee,
      notes,
    };

    addAppointment(newAppointment);
    toast.success('Appointment booked successfully!');
    navigate('/appointments');
  };

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-[#FFC0CB] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-4xl">
          <button onClick={() => step === 1 ? navigate(`/doctor/${id}`) : setStep(1)} className="flex items-center gap-2 mb-2">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-white">Book Appointment</h1>
          <p className="text-sm opacity-90 mt-1">
            Step {step} of 2: {step === 1 ? 'Select Date & Time' : 'Payment'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 max-w-4xl">
        {/* Doctor Info Card */}
        <div className="bg-[#ADD8E6] bg-opacity-10 p-4 rounded-lg mb-6 flex items-center gap-4">
          <div className="w-16 h-16 bg-[#ADD8E6] rounded-full flex items-center justify-center">
            <span className="text-3xl">👨‍⚕️</span>
          </div>
          <div>
            <h3>{doctor.name}</h3>
            <p className="text-sm text-[#A9A9A9]">{doctor.specialty}</p>
            <p className="text-sm font-medium text-[#FFC0CB]">${consultationFee} consultation fee</p>
          </div>
        </div>

        {step === 1 ? (
          <>
            {/* Location Selection */}
            <div className="mb-6">
              <Label htmlFor="location" className="mb-2 block">Select Location</Label>
              <Select value={selectedLocationId} onValueChange={setSelectedLocationId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc.id} value={loc.id}>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        {loc.name} - {loc.suburb}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                <h2 className="mb-4">Select Time</h2>
                {date ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border transition-all text-sm ${
                          selectedTime === time
                            ? 'bg-[#FFC0CB] text-white border-[#FFC0CB]'
                            : 'border-gray-200 hover:border-[#FFC0CB]'
                        }`}
                      >
                        <Clock size={14} className="inline mr-1" />
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#A9A9A9] text-center py-8">Please select a date first</p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific requirements or symptoms you'd like to mention..."
                rows={3}
                className="mt-1"
              />
            </div>

            <Button
              onClick={handleContinueToPayment}
              disabled={!date || !selectedTime || !selectedLocationId}
              className="w-full bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white h-12"
            >
              Continue to Payment
            </Button>
          </>
        ) : (
          <>
            {/* Booking Summary */}
            <div className="bg-[#ADD8E6] bg-opacity-10 p-6 rounded-lg mb-6">
              <h2 className="mb-4">Booking Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#A9A9A9]">Doctor:</span>
                  <span className="font-medium">{doctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A9A9A9]">Date:</span>
                  <span className="font-medium">{date && format(date, 'EEEE, MMMM d, yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A9A9A9]">Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A9A9A9]">Location:</span>
                  <span className="font-medium">{selectedLocation?.name}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3"></div>
                <div className="flex justify-between">
                  <span className="text-[#A9A9A9]">Consultation Fee:</span>
                  <span className="font-medium">${consultationFee}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold text-[#FFC0CB]">${consultationFee}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h2 className="mb-4">Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#FFC0CB]">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <CreditCard size={20} className="text-[#FFC0CB]" />
                        <div>
                          <p className="font-medium">Credit / Debit Card</p>
                          <p className="text-xs text-[#A9A9A9]">Visa, Mastercard, Amex</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#FFC0CB]">
                    <RadioGroupItem value="insurance" id="insurance" />
                    <Label htmlFor="insurance" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Shield className="h-5 w-5 text-[#FFC0CB]" />
                        <div>
                          <p className="font-medium">Health Insurance</p>
                          <p className="text-xs text-[#A9A9A9]">Direct billing to insurer</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-[#FFC0CB]">
                    <RadioGroupItem value="pay-later" id="pay-later" />
                    <Label htmlFor="pay-later" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <DollarSign size={20} className="text-[#FFC0CB]" />
                        <div>
                          <p className="font-medium">Pay at Clinic</p>
                          <p className="text-xs text-[#A9A9A9]">Pay during your visit</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Confirmation */}
            <div className="bg-[#ADD8E6] bg-opacity-10 p-4 rounded-lg mb-6 text-sm text-[#A9A9A9]">
              <p>
                By confirming this appointment, you agree to our{' '}
                <button onClick={() => navigate('/privacy-policy')} className="text-[#FFC0CB] hover:underline">
                  Terms & Conditions
                </button>.
                Cancellations must be made at least 24 hours in advance.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleConfirmBooking}
                className="flex-1 bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white h-12"
              >
                <Check size={20} className="mr-2" />
                Confirm & Pay
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};