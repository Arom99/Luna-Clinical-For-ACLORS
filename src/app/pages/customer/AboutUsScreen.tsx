import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, Award, Users, Heart, Target, Clock, Shield } from 'lucide-react';

export const AboutUsScreen = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: Heart,
      title: 'Patient-Centered Care',
      description: 'Your health and wellbeing are at the heart of everything we do.',
    },
    {
      icon: Award,
      title: 'Excellence in Service',
      description: 'We maintain the highest standards in pathology testing and reporting.',
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your health information is protected with advanced security measures.',
    },
    {
      icon: Clock,
      title: 'Quick Results',
      description: 'Fast turnaround times without compromising accuracy.',
    },
  ];

  const stats = [
    { value: '15+', label: 'Locations' },
    { value: '50K+', label: 'Patients Served' },
    { value: '25+', label: 'Specialist Doctors' },
    { value: '15 Years', label: 'Experience' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#FFC0CB] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-6xl">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-2">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-white">About Luna Clinical</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-12">
          <h2 className="mb-4">Your Trusted Healthcare Partner</h2>
          <p className="text-[#A9A9A9] leading-relaxed">
            Luna Clinical is Australia's leading pathology service provider, committed to delivering accurate,
            timely, and accessible diagnostic testing. Since 2011, we've been serving communities across
            Australia with state-of-the-art laboratories and compassionate care.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#FFC0CB] to-[#ADD8E6] p-6 rounded-lg text-center text-white"
            >
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#ADD8E6] bg-opacity-10 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Target size={24} className="text-[#FFC0CB]" />
              <h3>Our Mission</h3>
            </div>
            <p className="text-[#A9A9A9]">
              To provide accessible, high-quality pathology services that empower individuals to take
              control of their health through accurate diagnostics and compassionate care.
            </p>
          </div>

          <div className="bg-[#ADD8E6] bg-opacity-10 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Users size={24} className="text-[#FFC0CB]" />
              <h3>Our Vision</h3>
            </div>
            <p className="text-[#A9A9A9]">
              To be the most trusted and innovative pathology provider in Australia, setting new standards
              for patient care, accuracy, and accessibility in diagnostic testing.
            </p>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-12">
          <h2 className="mb-6 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div key={index} className="flex gap-4 p-6 bg-white border border-gray-200 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#ADD8E6] bg-opacity-30 rounded-full flex items-center justify-center">
                    <value.icon size={24} className="text-[#FFC0CB]" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2">{value.title}</h3>
                  <p className="text-sm text-[#A9A9A9]">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Team */}
        <div className="bg-gradient-to-r from-[#FFC0CB] to-[#ADD8E6] bg-opacity-10 p-8 rounded-lg mb-8 text-center">
          <h2 className="mb-4">World-Class Medical Team</h2>
          <p className="text-[#A9A9A9] max-w-3xl mx-auto mb-6">
            Our team consists of over 25 highly qualified pathologists, laboratory scientists, and healthcare
            professionals dedicated to providing you with accurate results and exceptional service.
          </p>
          <Button
            onClick={() => navigate('/doctors')}
            className="bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white"
          >
            Meet Our Doctors
          </Button>
        </div>

        {/* Accreditation */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-sm text-[#A9A9A9] mb-2">Accredited by:</p>
          <p className="text-[#A9A9A9]">
            NATA | RCPA | Australian Clinical Labs Accreditation | ISO 15189
          </p>
        </div>
      </div>
    </div>
  );
};