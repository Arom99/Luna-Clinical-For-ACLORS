import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';

export const FloatingAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          <div className="bg-[#FFC0CB] p-4 rounded-t-lg">
            <h3 className="font-semibold text-white">AI Assistant</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-[#ADD8E6] p-3 rounded-lg">
                <p className="text-sm">Hello! How can I help you today?</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="bg-white border border-gray-200 px-3 py-2 rounded-full text-sm hover:bg-gray-50">
                  Fasting Rules
                </button>
                <button className="bg-white border border-gray-200 px-3 py-2 rounded-full text-sm hover:bg-gray-50">
                  Test Prep
                </button>
                <button className="bg-white border border-gray-200 px-3 py-2 rounded-full text-sm hover:bg-gray-50">
                  Results Info
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
            />
          </div>
        </div>
      )}
    </>
  );
};
