import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, CreditCard, Plus } from 'lucide-react';

const paymentMethods = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', default: true },
  { id: 2, type: 'Mastercard', last4: '5555', expiry: '08/26', default: false },
];

const paymentIcons = {
  Visa: '💳',
  Mastercard: '💳',
  PayPal: '💰',
  Alipay: '💵',
  WeChat: '💬',
};

export const PaymentMethodsScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#FFC0CB] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => navigate('/home')} className="flex items-center gap-2 mb-2">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-white">Payment Methods</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 max-w-2xl">
        <div className="space-y-4 mb-6">
          {paymentMethods.map((method) => (
            <div key={method.id} className="bg-gradient-to-r from-[#FFC0CB] to-[#ADD8E6] rounded-lg p-4 text-white">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{paymentIcons[method.type as keyof typeof paymentIcons]}</span>
                  <div>
                    <p className="font-medium">{method.type}</p>
                    <p className="text-sm opacity-90">•••• {method.last4}</p>
                  </div>
                </div>
                {method.default && (
                  <span className="px-2 py-1 bg-white text-[#FFC0CB] text-xs rounded-full">
                    Default
                  </span>
                )}
              </div>
              <p className="text-sm opacity-90">Expires {method.expiry}</p>
            </div>
          ))}
        </div>

        <Button className="w-full bg-[#ADD8E6] hover:bg-[#9DC8D6] text-white">
          <Plus size={20} className="mr-2" />
          Add Payment Method
        </Button>

        <div className="mt-8">
          <h2 className="mb-4">Supported Payment Methods</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Visa', 'Mastercard', 'PayPal', 'Alipay', 'WeChat'].map((method) => (
              <div key={method} className="bg-gray-50 p-4 rounded-lg text-center">
                <span className="text-3xl mb-2 block">{paymentIcons[method as keyof typeof paymentIcons]}</span>
                <p className="text-sm text-[#A9A9A9]">{method}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
