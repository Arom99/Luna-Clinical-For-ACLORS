import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { useApp } from '@/app/context/AppContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const aiResponses: { [key: string]: string } = {
  'fasting': 'For most blood tests, you should fast for 8-12 hours before your appointment. This means no food or drinks except water. Some tests like glucose or lipid panels require fasting for accurate results.',
  'test prep': 'Test preparation varies by test type. Generally: avoid alcohol 24 hours before, stay hydrated, wear comfortable clothing, and bring your Medicare card and referral form.',
  'results': 'Test results are typically available within 2-5 business days. You\'ll receive a notification when they\'re ready. Critical results are communicated immediately by phone.',
  'appointment': 'You can book appointments through the app. Select a doctor, choose your preferred time slot, and complete the payment. You can also reschedule or cancel up to 24 hours before.',
  'payment': 'We accept credit/debit cards, health insurance direct billing, and payment at the clinic. Bulk billing is available for eligible Medicare card holders.',
  'location': 'Luna Clinical has 15 locations across major cities. You can view all locations and their facilities in the Locations section of the app.',
  'doctor': 'Our team includes 25 specialist pathologists and lab directors. You can view doctor profiles, specialties, and availability in the Doctors section.',
  'insurance': 'We work with all major health insurance providers including Bupa, Medibank, HCF, and Medicare. Direct billing is available for most providers.',
  'default': 'I\'m here to help with questions about appointments, test preparation, results, payments, and general pathology queries. How can I assist you today?'
};

const quickReplies = [
  { label: 'Fasting Rules', key: 'fasting' },
  { label: 'Test Preparation', key: 'test prep' },
  { label: 'Results Timeline', key: 'results' },
  { label: 'Book Appointment', key: 'appointment' },
  { label: 'Payment Options', key: 'payment' },
  { label: 'Find Location', key: 'location' },
];

export const FloatingAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your Luna Clinical AI Assistant. I can help you with:\n\n• Appointment booking and management\n• Test preparation guidelines\n• Understanding your results\n• Payment and insurance questions\n• Finding locations and doctors\n\nHow can I assist you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { appointments } = useApp();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for appointment-related queries
    if (lowerMessage.includes('appointment') || lowerMessage.includes('book')) {
      const upcomingCount = appointments.filter(apt => apt.status === 'upcoming').length;
      if (upcomingCount > 0) {
        return `You have ${upcomingCount} upcoming appointment${upcomingCount > 1 ? 's' : ''}. ${aiResponses['appointment']}`;
      }
      return aiResponses['appointment'];
    }

    // Check for specific keywords
    for (const [key, response] of Object.entries(aiResponses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response;
      }
    }

    // Context-aware responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! How can I help you with your pathology needs today?';
    }
    
    if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help you with?';
    }

    return aiResponses['default'];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);
  };

  const handleQuickReply = (key: string) => {
    const message = quickReplies.find(qr => qr.key === key)?.label || key;
    setInputValue(message);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponses[key] || aiResponses['default'],
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#FFC0CB] hover:bg-[#FFB0BB] shadow-lg"
        aria-label="AI Assistant"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          <div className="bg-[#FFC0CB] p-4 rounded-t-lg flex items-center gap-2">
            <Bot size={20} className="text-white" />
            <div>
              <h3 className="font-semibold text-white">Luna AI Assistant</h3>
              <p className="text-xs text-white opacity-90">Online • Always here to help</p>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-[#FFC0CB] text-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white opacity-75' : 'text-gray-400'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply.key}
                      onClick={() => handleQuickReply(reply.key)}
                      className="bg-white border border-[#FFC0CB] text-[#FFC0CB] px-3 py-2 rounded-full text-sm hover:bg-[#FFC0CB] hover:text-white transition-colors"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFC0CB] text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="h-10 w-10 rounded-full bg-[#FFC0CB] hover:bg-[#FFB0BB] p-0"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
