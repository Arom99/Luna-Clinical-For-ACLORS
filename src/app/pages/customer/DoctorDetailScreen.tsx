import { useNavigate, useParams } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, Star, MapPin, Clock, Calendar, Award, MessageCircle } from 'lucide-react';

export const DoctorDetailScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#FFC0CB] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => navigate('/doctors')} className="flex items-center gap-2 mb-4 hover:opacity-80">
            <ArrowLeft size={20} />
            <span>Back to Doctors</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 max-w-4xl">
        {/* Doctor Profile Card */}
        <div className="bg-[#ADD8E6] bg-opacity-20 rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-24 h-24 bg-[#ADD8E6] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-5xl">👨‍⚕️</span>
            </div>
            <div className="flex-1">
              <h1 className="mb-2">Dr. Sarah Johnson</h1>
              <p className="text-[#A9A9A9] mb-3">Pathologist · 15 years experience</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400" fill="currentColor" />
                  <span>4.9 (156 reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-[#A9A9A9]">
                  <MapPin size={16} />
                  <span>Sydney CBD</span>
                </div>
                <div className="flex items-center gap-1 text-[#A9A9A9]">
                  <Clock size={16} />
                  <span>9 AM - 5 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h2 className="mb-3">About</h2>
          <p className="text-[#A9A9A9]">
            Dr. Sarah Johnson is a highly experienced pathologist specializing in clinical diagnostics and laboratory medicine. 
            With over 15 years of experience, she has helped thousands of patients understand their health through accurate testing and compassionate care.
          </p>
        </div>

        {/* Specializations */}
        <div className="mb-6">
          <h2 className="mb-3">Specializations</h2>
          <div className="flex flex-wrap gap-2">
            {['Blood Tests', 'Biochemistry', 'Microbiology', 'Histopathology'].map((spec) => (
              <span key={spec} className="px-4 py-2 bg-[#ADD8E6] bg-opacity-30 rounded-full text-sm">
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Credentials */}
        <div className="mb-8">
          <h2 className="mb-3">Credentials</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Award size={20} className="text-[#FFC0CB] mt-1" />
              <div>
                <p className="font-medium">MBBS, MD (Pathology)</p>
                <p className="text-sm text-[#A9A9A9]">University of Sydney, 2008</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Award size={20} className="text-[#FFC0CB] mt-1" />
              <div>
                <p className="font-medium">Fellow, Royal College of Pathologists</p>
                <p className="text-sm text-[#A9A9A9]">2012</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 sticky bottom-0 bg-white py-4 border-t">
          <Button
            onClick={() => navigate(`/schedule/${id}`)}
            className="flex-1 bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white h-12"
          >
            <Calendar size={20} className="mr-2" />
            Book Appointment
          </Button>
          <Button
            onClick={() => navigate(`/doctor-chat/${id}`)}
            variant="outline"
            className="flex-1 border-[#FFC0CB] text-[#FFC0CB] hover:bg-[#FFC0CB] hover:text-white h-12"
          >
            <MessageCircle size={20} className="mr-2" />
            Message Doctor
          </Button>
        </div>
      </div>
    </div>
  );
};