import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { ArrowLeft, PlusCircle, Save } from 'lucide-react';
import { toast } from 'sonner';

export const AdminDoctors = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', specialty: '', location: 'Sydney CBD', consultationFee: 150,
    rating: 5.0, reviews: 0, available: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc = { ...formData, id: `doc_${Date.now()}`, locationId: 'loc1' };

    try {
      await fetch('http://localhost:5000/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDoc)
      });
      toast.success("Doctor Added Successfully!");
      navigate('/admin');
    } catch (err) { toast.error("Error adding doctor"); }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Button variant="ghost" onClick={() => navigate('/admin')} className="mb-6 hover:bg-pink-50 text-gray-600">
        <ArrowLeft size={20} className="mr-2"/> Back to Dashboard
      </Button>

      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-pink-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#FFC0CB]/20 p-3 rounded-full">
            <PlusCircle size={32} className="text-[#FFC0CB]"/>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Add New Doctor</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1.5 font-medium text-gray-700">Doctor Name</label>
            <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Dr. Strange" className="bg-gray-50 border-gray-200 focus:border-[#FFC0CB]"/>
          </div>
          <div>
            <label className="block mb-1.5 font-medium text-gray-700">Specialty</label>
            <Input required value={formData.specialty} onChange={e => setFormData({...formData, specialty: e.target.value})} placeholder="e.g. Neurosurgeon" className="bg-gray-50 border-gray-200 focus:border-[#FFC0CB]"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 font-medium text-gray-700">Fee ($)</label>
              <Input type="number" value={formData.consultationFee} onChange={e => setFormData({...formData, consultationFee: Number(e.target.value)})} className="bg-gray-50 border-gray-200 focus:border-[#FFC0CB]"/>
            </div>
            <div>
              <label className="block mb-1.5 font-medium text-gray-700">Location</label>
              <Input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="bg-gray-50 border-gray-200 focus:border-[#FFC0CB]"/>
            </div>
          </div>
          <Button type="submit" className="w-full bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white mt-4 h-12 text-lg shadow-md hover:shadow-lg transition-all">
            <Save size={20} className="mr-2"/> Save to Database
          </Button>
        </form>
      </div>
    </div>
  );
};