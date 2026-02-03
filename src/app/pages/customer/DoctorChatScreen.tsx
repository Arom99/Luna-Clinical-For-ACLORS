import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { ArrowLeft, Send, Paperclip, Image as ImageIcon, Phone, Video } from 'lucide-react';
import { doctors } from '@/app/data/doctors';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'doctor';
  timestamp: Date;
  type: 'text' | 'image' | 'file';
}

export const DoctorChatScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const doctor = doctors.find((d) => d.id === id);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: `Hello! I'm Dr. ${doctor?.name.split(' ')[1] || 'Doctor'}. How can I help you today?`,
      sender: 'doctor',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getDoctorResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('appointment') || lowerMessage.includes('book')) {
      return `I'd be happy to see you. You can book an appointment through the app or I can help coordinate a suitable time. What works best for you?`;
    }

    if (lowerMessage.includes('result') || lowerMessage.includes('test')) {
      return `I've reviewed your recent test results. Everything looks good overall. Would you like me to explain any specific values or do you have concerns about particular results?`;
    }

    if (lowerMessage.includes('symptom') || lowerMessage.includes('pain') || lowerMessage.includes('feel')) {
      return `I understand you're experiencing some symptoms. Can you describe them in more detail? When did they start and how severe are they? This will help me provide better guidance.`;
    }

    if (lowerMessage.includes('medication') || lowerMessage.includes('medicine')) {
      return `Regarding your medication, it's important to follow the prescribed dosage. If you're experiencing any side effects, please let me know immediately.`;
    }

    if (lowerMessage.includes('thank')) {
      return `You're very welcome! Don't hesitate to reach out if you have any other questions or concerns. Take care!`;
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello! Good to hear from you. What can I help you with today?`;
    }

    return `Thank you for your message. I'll review this and get back to you with detailed information shortly. In the meantime, if this is urgent, please don't hesitate to call our clinic.`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate doctor typing and response
    setTimeout(() => {
      setIsTyping(false);
      const doctorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getDoctorResponse(inputValue),
        sender: 'doctor',
        timestamp: new Date(),
        type: 'text',
      };
      setMessages((prev) => [...prev, doctorMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleAttachment = () => {
    toast.info('Attachment feature coming soon!');
  };

  const handleVoiceCall = () => {
    toast.info('Voice call feature coming soon!');
  };

  const handleVideoCall = () => {
    toast.info('Video call feature coming soon!');
  };

  if (!doctor) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#A9A9A9]">Doctor not found</p>
          <Button onClick={() => navigate('/doctors')} className="mt-4">
            Browse Doctors
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-[#FFC0CB] text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/doctors')} className="flex items-center">
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <div>
                  <h2 className="text-white font-semibold">{doctor.name}</h2>
                  <p className="text-xs text-white opacity-90">
                    {doctor.specialty} • {doctor.available ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleVoiceCall}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white hover:bg-opacity-20 h-9 w-9 p-0 rounded-full"
              >
                <Phone size={18} />
              </Button>
              <Button
                onClick={handleVideoCall}
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white hover:bg-opacity-20 h-9 w-9 p-0 rounded-full"
              >
                <Video size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] md:max-w-[60%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-[#FFC0CB] text-white'
                      : 'bg-white border border-gray-200 shadow-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white opacity-75' : 'text-gray-400'
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 shadow-sm p-3 rounded-lg">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#A9A9A9] rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[#A9A9A9] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-[#A9A9A9] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="bg-white border-t border-gray-200 p-3">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setInputValue('Can we schedule an appointment?')}
              className="px-4 py-2 bg-[#ADD8E6] bg-opacity-20 text-sm rounded-full whitespace-nowrap hover:bg-opacity-30 transition-colors"
            >
              Schedule appointment
            </button>
            <button
              onClick={() => setInputValue('Can you review my test results?')}
              className="px-4 py-2 bg-[#ADD8E6] bg-opacity-20 text-sm rounded-full whitespace-nowrap hover:bg-opacity-30 transition-colors"
            >
              Test results
            </button>
            <button
              onClick={() => setInputValue('I have some questions about my symptoms')}
              className="px-4 py-2 bg-[#ADD8E6] bg-opacity-20 text-sm rounded-full whitespace-nowrap hover:bg-opacity-30 transition-colors"
            >
              Ask about symptoms
            </button>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-2 items-center">
            <Button
              onClick={handleAttachment}
              size="sm"
              variant="ghost"
              className="text-[#A9A9A9] hover:text-[#FFC0CB] h-10 w-10 p-0 rounded-full"
            >
              <Paperclip size={20} />
            </Button>
            <Button
              onClick={handleAttachment}
              size="sm"
              variant="ghost"
              className="text-[#A9A9A9] hover:text-[#FFC0CB] h-10 w-10 p-0 rounded-full"
            >
              <ImageIcon size={20} />
            </Button>
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 rounded-full"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="h-10 w-10 rounded-full bg-[#FFC0CB] hover:bg-[#FFB0BB] p-0"
            >
              <Send size={18} />
            </Button>
          </div>
          <p className="text-xs text-[#A9A9A9] mt-2 text-center">
            Messages are secure and HIPAA compliant
          </p>
        </div>
      </div>
    </div>
  );
};
