import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { 
  Bell, Calendar, FileText, Users, MapPin, MessageCircle, User, 
  Edit, LogOut, Clock, CreditCard, ChevronRight, Send, X, Bot, Sparkles, Loader2 
} from 'lucide-react';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Real Data State
  const [nextAppointment, setNextAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // State for AI Chat
  const [showAI, setShowAI] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  // AI Initial Message in English
  const [chatHistory, setChatHistory] = useState([
    { sender: 'ai', text: 'Hello! I am Luna AI. How can I help you today?' }
  ]);

  // --- 1. FETCH DATA FROM SERVER ---
  useEffect(() => {
    fetch('http://localhost:5000/appointments')
      .then(res => res.json())
      .then(data => {
        // Sort by creation date to get the newest booking
        const sorted = data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        const active = sorted.find((a: any) => a.status !== 'Cancelled');
        
        if (active) {
          setNextAppointment(active);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/welcome');
  };

  // --- 2. HANDLE AI CHAT (ENGLISH ONLY) ---
  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    // Add User Message
    setChatHistory(prev => [...prev, { sender: 'user', text: chatMessage }]);
    const userMsg = chatMessage;
    setChatMessage(''); // Clear input
    
    // Simulate AI Response
    setTimeout(() => {
      let reply = "I can help you book appointments or view test results. Please select an option from the menu!";
      
      const lowerMsg = userMsg.toLowerCase();
      // Basic keyword detection
      if (lowerMsg.includes('pain') || lowerMsg.includes('fever') || lowerMsg.includes('sick') || lowerMsg.includes('hurt')) {
        reply = "If you are feeling unwell, please book an appointment with our specialist immediately.";
      } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        reply = "Hello! How can I assist you today?";
      } else if (lowerMsg.includes('book') || lowerMsg.includes('appointment')) {
        reply = "You can book a new appointment by clicking 'Book Test' or 'Find Doctors'.";
      } else if (lowerMsg.includes('result')) {
        reply = "You can view your latest lab results in the 'Test Results' section.";
      }

      setChatHistory(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 1000);
  };

  const menuItems = [
    { icon: Calendar, label: 'My Appointments', path: '/appointments' },
    { icon: Users, label: 'Find Doctors', path: '/doctors' },
    { icon: FileText, label: 'Test Results', path: '/results' },
    { icon: CreditCard, label: 'Payment Methods', path: '/payments' },
    { icon: MapPin, label: 'Locations', path: '/locations' },
    { icon: User, label: 'My Profile', path: '/profile' },
  ];

  const quickActions = [
    { icon: Calendar, label: 'Book Test', action: () => navigate('/doctors'), color: '#FFC0CB' },
    { icon: FileText, label: 'View Results', action: () => navigate('/results'), color: '#ADD8E6' },
    { icon: MessageCircle, label: 'AI Assistant', action: () => setShowAI(true), color: '#FFD700' },
  ];

  return (
    <div className="min-h-screen bg-white pb-20 relative">
      {/* --- HEADER --- */}
      <div className="bg-gradient-to-r from-[#FFC0CB] to-[#ADD8E6] text-white p-6 rounded-b-[2.5rem] shadow-lg mb-12">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-sm opacity-90 font-medium tracking-wide">Welcome back,</h2>
              <h1 className="text-3xl font-bold mt-1">{user?.name || 'Patient'}</h1>
            </div>
            <div className="flex gap-3">
              <button onClick={() => navigate('/edit-profile')} className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all border border-white/30">
                <Edit size={20} />
              </button>
              <button onClick={handleLogout} className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all border border-white/30">
                <LogOut size={20} />
              </button>
            </div>
          </div>

          {/* Quick Actions (Floating Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 -mb-16 relative z-10 px-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="bg-white text-[#333333] p-4 rounded-2xl flex items-center gap-4 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100 group"
              >
                <div className="p-3 rounded-full shadow-inner group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: action.color }}>
                  <action.icon size={24} className="text-white" />
                </div>
                <span className="font-bold text-lg text-gray-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-4 md:px-8 pt-8 pb-6 max-w-7xl">
        
        {/* Upcoming Appointment Section */}
        <div className="mb-10 mt-4">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-xl font-bold text-gray-800">Your Schedule</h2>
            <button onClick={() => navigate('/appointments')} className="text-sm text-[#FFC0CB] font-semibold hover:underline flex items-center gap-1 transition-colors hover:text-[#ff9eb0]">
              View All <ChevronRight size={16} />
            </button>
          </div>

          {loading ? (
            <div className="h-40 bg-gray-50 rounded-2xl animate-pulse border border-gray-100 flex items-center justify-center">
                <Loader2 className="animate-spin text-[#FFC0CB]" />
            </div>
          ) : nextAppointment ? (
            <div className="bg-gradient-to-r from-[#FFC0CB] to-[#ADD8E6] p-6 rounded-3xl text-white shadow-xl relative overflow-hidden group transition-all hover:shadow-2xl">
              {/* Decorative Elements */}
              <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
              <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700"></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/90 rounded-2xl flex items-center justify-center text-3xl shadow-md backdrop-blur-sm">
                      👨‍⚕️
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl drop-shadow-sm">{nextAppointment.doctorName}</h3>
                      <p className="text-white/90 font-medium">{nextAppointment.specialty}</p>
                    </div>
                  </div>
                  {/* Status Badge */}
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold bg-white text-[#FFC0CB] shadow-md uppercase tracking-wider`}>
                    {nextAppointment.status === 'ResultsReady' ? 'Results Ready' : nextAppointment.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg"><Calendar size={18} /></div>
                    <div>
                      <p className="text-xs text-white/70">Date</p>
                      <p className="font-semibold text-sm">{nextAppointment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg"><Clock size={18} /></div>
                    <div>
                      <p className="text-xs text-white/70">Time</p>
                      <p className="font-semibold text-sm">{nextAppointment.time}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  {nextAppointment.status === 'ResultsReady' ? (
                    <Button 
                      onClick={() => navigate('/results')} 
                      className="w-full bg-white text-[#FFC0CB] hover:bg-white/90 font-bold shadow-lg h-12 text-md transition-transform hover:scale-[1.02]"
                    >
                      <FileText size={18} className="mr-2"/> View Results Now
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => navigate('/appointments')} 
                      className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/50 backdrop-blur-md h-12 font-semibold transition-all hover:border-white"
                    >
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center hover:border-[#FFC0CB]/50 transition-colors">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📅</div>
              <p className="text-gray-500 mb-6 font-medium">You have no upcoming appointments.</p>
              <Button onClick={() => navigate('/doctors')} className="bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white px-8 h-11 rounded-full shadow-md hover:shadow-lg transition-all">
                Book Appointment
              </Button>
            </div>
          )}
        </div>

        {/* Services Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 px-1">Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="bg-white border border-gray-100 p-6 rounded-2xl hover:shadow-lg hover:border-[#FFC0CB]/50 transition-all flex flex-col items-center gap-3 group"
              >
                <div className="w-14 h-14 bg-[#FFC0CB]/10 rounded-full flex items-center justify-center group-hover:bg-[#FFC0CB] transition-all duration-300">
                  <item.icon size={26} className="text-[#FFC0CB] group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-800">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- AI ASSISTANT MODAL (ENGLISH) --- */}
      {showAI && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#FFC0CB]/20 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-white/50">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#FFC0CB] to-[#FFB0BB] p-5 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                    <Bot size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-lg leading-tight">Luna Assistant</h3>
                    <p className="text-xs text-white/80">English Support</p>
                </div>
              </div>
              <button onClick={() => setShowAI(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors"><X size={20}/></button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-gray-50 h-96 scrollbar-thin scrollbar-thumb-gray-200">
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-[#FFC0CB] text-white rounded-br-sm' 
                      : 'bg-white border border-gray-100 text-gray-700 rounded-bl-sm'
                  }`}>
                    {msg.sender === 'ai' && <div className="flex items-center gap-1 mb-1 text-[#FFC0CB] font-bold text-xs"><Sparkles size={10}/> Luna AI</div>}
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 flex gap-2 items-center">
              <Input 
                value={chatMessage} 
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask me anything..." 
                className="flex-1 border-gray-200 bg-gray-50 rounded-full px-4 focus:ring-[#FFC0CB]"
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} className="bg-[#FFC0CB] hover:bg-[#FFB0BB] rounded-full w-10 h-10 p-0 flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95">
                <Send size={18} className="ml-0.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};