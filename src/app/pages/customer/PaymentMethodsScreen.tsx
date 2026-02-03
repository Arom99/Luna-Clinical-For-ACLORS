import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ArrowLeft, CreditCard, Plus, Trash2, Star, Shield, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentMethod {
  id: number;
  type: 'Visa' | 'Mastercard' | 'AmEx' | 'PayPal';
  last4: string;
  expiry: string;
  default: boolean;
  cardholderName: string;
}

const paymentIcons = {
  Visa: '💳',
  Mastercard: '💳',
  AmEx: '💳',
  PayPal: '💰',
};

export const PaymentMethodsScreen = () => {
  const navigate = useNavigate();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', default: true, cardholderName: 'John Doe' },
    { id: 2, type: 'Mastercard', last4: '5555', expiry: '08/26', default: false, cardholderName: 'John Doe' },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardholderName: '',
    expiry: '',
    cvv: '',
    type: 'Visa' as 'Visa' | 'Mastercard' | 'AmEx',
  });

  const handleDeleteCard = (id: number) => {
    const method = paymentMethods.find(m => m.id === id);
    if (method?.default) {
      toast.error('Cannot delete default payment method. Set another as default first.');
      return;
    }
    setPaymentMethods(methods => methods.filter(m => m.id !== id));
    toast.success('Payment method removed');
  };

  const handleSetDefault = (id: number) => {
    setPaymentMethods(methods =>
      methods.map(m => ({
        ...m,
        default: m.id === id,
      }))
    );
    toast.success('Default payment method updated');
  };

  const handleAddCard = () => {
    if (!newCard.cardNumber || !newCard.cardholderName || !newCard.expiry || !newCard.cvv) {
      toast.error('Please fill in all fields');
      return;
    }

    const last4 = newCard.cardNumber.slice(-4);
    const newMethod: PaymentMethod = {
      id: Date.now(),
      type: newCard.type,
      last4,
      expiry: newCard.expiry,
      default: paymentMethods.length === 0,
      cardholderName: newCard.cardholderName,
    };

    setPaymentMethods([...paymentMethods, newMethod]);
    setIsDialogOpen(false);
    setNewCard({
      cardNumber: '',
      cardholderName: '',
      expiry: '',
      cvv: '',
      type: 'Visa',
    });
    toast.success('Payment method added successfully!');
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="bg-[#FFC0CB] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => navigate('/home')} className="flex items-center gap-2 mb-2">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-white">Payment Methods</h1>
          <p className="text-sm opacity-90 mt-1">Manage your payment options</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 max-w-4xl">
        {/* Security Banner */}
        <div className="bg-[#ADD8E6] bg-opacity-10 p-4 rounded-lg mb-6 flex items-start gap-3">
          <Shield size={20} className="text-[#ADD8E6] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">Your payment information is secure</p>
            <p className="text-xs text-[#A9A9A9] mt-1">
              We use industry-standard encryption to protect your financial data. Card details are never stored on our servers.
            </p>
          </div>
        </div>

        {/* Payment Methods List */}
        <div className="mb-6">
          <h2 className="mb-4">Saved Cards</h2>
          {paymentMethods.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <CreditCard size={48} className="mx-auto text-[#A9A9A9] mb-4" />
              <p className="text-[#A9A9A9] mb-4">No payment methods saved</p>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white">
                    <Plus size={16} className="mr-2" />
                    Add Your First Card
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="cardType">Card Type</Label>
                      <Select
                        value={newCard.type}
                        onValueChange={(value: 'Visa' | 'Mastercard' | 'AmEx') =>
                          setNewCard({ ...newCard, type: value })
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Visa">Visa</SelectItem>
                          <SelectItem value="Mastercard">Mastercard</SelectItem>
                          <SelectItem value="AmEx">American Express</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        value={newCard.cardNumber}
                        onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={newCard.cardholderName}
                        onChange={(e) => setNewCard({ ...newCard, cardholderName: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={newCard.expiry}
                          onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          placeholder="123"
                          maxLength={4}
                          value={newCard.cvv}
                          onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <Button onClick={handleAddCard} className="w-full bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white">
                      Add Card
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="bg-gradient-to-r from-[#FFC0CB] to-[#ADD8E6] rounded-lg p-6 text-white shadow-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-2xl">{paymentIcons[method.type]}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{method.type}</p>
                        <p className="text-sm opacity-90">•••• •••• •••• {method.last4}</p>
                        <p className="text-xs opacity-75 mt-1">{method.cardholderName}</p>
                      </div>
                    </div>
                    {method.default && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-white text-[#FFC0CB] text-xs rounded-full">
                        <Star size={12} fill="currentColor" />
                        Default
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs opacity-75">Expires</p>
                      <p className="text-sm">{method.expiry}</p>
                    </div>
                    <div className="flex gap-2">
                      {!method.default && (
                        <Button
                          onClick={() => handleSetDefault(method.id)}
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white hover:bg-opacity-20 border border-white"
                        >
                          Set Default
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDeleteCard(method.id)}
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-red-500 hover:bg-opacity-80"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-[#ADD8E6] hover:bg-[#9DC8D6] text-white">
                    <Plus size={20} className="mr-2" />
                    Add Payment Method
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="cardType">Card Type</Label>
                      <Select
                        value={newCard.type}
                        onValueChange={(value: 'Visa' | 'Mastercard' | 'AmEx') =>
                          setNewCard({ ...newCard, type: value })
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Visa">Visa</SelectItem>
                          <SelectItem value="Mastercard">Mastercard</SelectItem>
                          <SelectItem value="AmEx">American Express</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        value={newCard.cardNumber}
                        onChange={(e) => setNewCard({ ...newCard, cardNumber: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={newCard.cardholderName}
                        onChange={(e) => setNewCard({ ...newCard, cardholderName: e.target.value })}
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          maxLength={5}
                          value={newCard.expiry}
                          onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="password"
                          placeholder="123"
                          maxLength={4}
                          value={newCard.cvv}
                          onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <Button onClick={handleAddCard} className="w-full bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white">
                      Add Card
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>

        {/* Payment Features */}
        <div className="mb-6">
          <h2 className="mb-4">Payment Features</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 p-4 rounded-lg">
              <Shield size={24} className="text-[#FFC0CB] mb-2" />
              <h3 className="font-medium mb-1">Secure Payments</h3>
              <p className="text-sm text-[#A9A9A9]">256-bit SSL encryption</p>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-lg">
              <CheckCircle size={24} className="text-[#ADD8E6] mb-2" />
              <h3 className="font-medium mb-1">Instant Confirmation</h3>
              <p className="text-sm text-[#A9A9A9]">Get receipts immediately</p>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-lg">
              <CreditCard size={24} className="text-[#FFC0CB] mb-2" />
              <h3 className="font-medium mb-1">Multiple Options</h3>
              <p className="text-sm text-[#A9A9A9]">Credit, debit & insurance</p>
            </div>
          </div>
        </div>

        {/* Supported Payment Methods */}
        <div>
          <h2 className="mb-4">Supported Payment Methods</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {['Visa', 'Mastercard', 'AmEx', 'PayPal'].map((method) => (
              <div key={method} className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <span className="text-3xl mb-2 block">{paymentIcons[method as keyof typeof paymentIcons]}</span>
                <p className="text-xs text-[#A9A9A9]">{method}</p>
              </div>
            ))}
            <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition-colors">
              <span className="text-3xl mb-2 block">🏥</span>
              <p className="text-xs text-[#A9A9A9]">Insurance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
