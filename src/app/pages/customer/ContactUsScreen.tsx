import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ArrowLeft, Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

export const ContactUsScreen = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      primary: '1800 LUNA CARE',
      secondary: '1800 586 222',
      description: 'Mon-Fri: 7am-7pm, Sat-Sun: 8am-5pm',
    },
    {
      icon: Mail,
      title: 'Email',
      primary: 'info@lunaclinical.com.au',
      secondary: 'support@lunaclinical.com.au',
      description: 'Response within 24 hours',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      primary: 'Available in app',
      secondary: 'AI Assistant 24/7',
      description: 'Instant responses to common queries',
    },
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: '7:00 AM - 7:00 PM' },
    { day: 'Saturday', hours: '8:00 AM - 5:00 PM' },
    { day: 'Sunday', hours: '8:00 AM - 5:00 PM' },
    { day: 'Public Holidays', hours: 'Closed (Emergency services available)' },
  ];

  const subjects = [
    'General Inquiry',
    'Appointment Booking',
    'Test Results',
    'Billing Question',
    'Feedback or Complaint',
    'Technical Support',
    'Other',
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#FFC0CB] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-6xl">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-2">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-white">Contact Us</h1>
          <p className="text-sm opacity-90 mt-1">We're here to help you</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8 max-w-6xl">
        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-[#ADD8E6] bg-opacity-10 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-[#ADD8E6] bg-opacity-30 rounded-full mx-auto mb-4 flex items-center justify-center">
                <method.icon size={28} className="text-[#FFC0CB]" />
              </div>
              <h3 className="mb-2">{method.title}</h3>
              <p className="font-medium mb-1">{method.primary}</p>
              <p className="text-sm text-[#A9A9A9] mb-2">{method.secondary}</p>
              <p className="text-xs text-[#A9A9A9]">{method.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div>
            <h2 className="mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="John Doe"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+61 400 000 000"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select value={formData.subject} onValueChange={(val) => handleChange('subject', val)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="How can we help you?"
                  rows={5}
                  required
                  className="mt-1 resize-none"
                />
              </div>

              <Button type="submit" className="w-full bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white">
                <Send size={16} className="mr-2" />
                Send Message
              </Button>
            </form>
          </div>

          {/* Office Hours & Info */}
          <div>
            <h2 className="mb-6">Office Hours</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={24} className="text-[#FFC0CB]" />
                <h3>Business Hours</h3>
              </div>
              <div className="space-y-3">
                {officeHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-[#A9A9A9]">{schedule.day}</span>
                    <span className="font-medium">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Head Office */}
            <div className="bg-[#ADD8E6] bg-opacity-10 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={24} className="text-[#FFC0CB]" />
                <h3>Head Office</h3>
              </div>
              <div className="space-y-2 text-sm text-[#A9A9A9]">
                <p>Luna Clinical Pathology</p>
                <p>Level 5, 123 Health Street</p>
                <p>Sydney NSW 2000</p>
                <p>Australia</p>
              </div>
              <Button
                onClick={() => navigate('/locations')}
                variant="outline"
                className="w-full mt-4 border-[#FFC0CB] text-[#FFC0CB] hover:bg-[#FFC0CB] hover:text-white"
              >
                <MapPin size={16} className="mr-2" />
                View All Locations
              </Button>
            </div>

            {/* Emergency Info */}
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">
                <strong>Emergency Medical Attention:</strong>
                <br />
                For medical emergencies, please call 000 or visit your nearest emergency department.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};