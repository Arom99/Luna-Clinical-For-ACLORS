import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, CheckCircle, Trash2, Search, Loader2, Upload, X, FileText } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { toast } from 'sonner';

export const BookingsManagement = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Upload Modal State
  const [showUpload, setShowUpload] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const fetchBookings = () => {
    setLoading(true);
    fetch('http://localhost:5000/appointments')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setBookings([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Booking fetch error:", err);
        setBookings([]);
        setLoading(false);
      });
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleStatusUpdate = async (id: string, status: string, extraData = {}) => {
    try {
      const res = await fetch(`http://localhost:5000/appointments/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ status, ...extraData })
      });
      if (res.ok) {
        toast.success(`Status updated to: ${status}`);
        setShowUpload(false);
        fetchBookings();
      } else {
        toast.error("Failed to update status");
      }
    } catch (e) { toast.error("Connection error"); }
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Delete this booking?")) return;
    try {
      await fetch(`http://localhost:5000/appointments/${id}`, { method: 'DELETE' });
      toast.success("Deleted");
      fetchBookings();
    } catch (e) { toast.error("Delete failed"); }
  };

  const openUploadModal = (id: string) => {
    setSelectedBookingId(id);
    setShowUpload(true);
  };

  const confirmUpload = () => {
    if(!file || !selectedBookingId) return toast.error("Please select a file");
    handleStatusUpdate(selectedBookingId, 'ResultsReady', { resultFile: file.name });
  };

  const filtered = bookings.filter(b => 
    (b.patientName || 'Guest').toLowerCase().includes(search.toLowerCase()) ||
    (b.doctorName || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Button variant="ghost" onClick={() => navigate('/admin')} className="mb-4">
        <ArrowLeft size={16} className="mr-2"/> Dashboard
      </Button>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Booking Control Center</h1>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 text-gray-400" size={18}/>
          <Input placeholder="Search patient..." className="pl-9 bg-white" value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
      </div>

      <div className="space-y-4">
        {loading ? <Loader2 className="animate-spin mx-auto"/> : filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No bookings found.</div>
        ) : filtered.map(item => (
          <div key={item._id} className="bg-white p-5 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-center border hover:border-pink-200 transition-all gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-0.5 rounded text-xs font-bold text-white uppercase
                  ${item.status === 'Confirmed' ? 'bg-blue-500' : item.status === 'Completed' ? 'bg-yellow-500' : 'bg-green-500'}`}>
                  {item.status}
                </span>
                <h3 className="font-bold text-lg">{item.patientName || 'Unknown Patient'}</h3>
              </div>
              <div className="text-sm text-gray-500 grid grid-cols-1 md:grid-cols-3 gap-2">
                <span>👨‍⚕️ {item.doctorName}</span>
                <span>📅 {item.date} at {item.time}</span>
                <span className="text-green-600 font-medium">Paid: ${item.amount}</span>
              </div>
            </div>

            <div className="flex gap-2">
              {item.status === 'Confirmed' && (
                <Button size="sm" onClick={() => handleStatusUpdate(item._id, 'Completed')} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <CheckCircle size={16} className="mr-1"/> Mark Examined
                </Button>
              )}
              {item.status === 'Completed' && (
                <Button size="sm" onClick={() => openUploadModal(item._id)} className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Upload size={16} className="mr-1"/> Upload Result
                </Button>
              )}
              {item.status === 'ResultsReady' && (
                <Button size="sm" variant="outline" className="text-green-600 border-green-200 bg-green-50 cursor-default">
                  <FileText size={16} className="mr-1"/> Sent
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={() => handleDelete(item._id)} className="text-red-500 border-red-200 hover:bg-red-50">
                <Trash2 size={16}/>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* --- UPLOAD MODAL --- */}
      {showUpload && (
        <div className="fixed inset-0 bg-[#FFC0CB]/30 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 border border-pink-100">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-lg">Upload Patient Results</h3>
              <button onClick={() => setShowUpload(false)}><X size={20}/></button>
            </div>
            {/* ĐÃ SỬA LỖI CÚ PHÁP TẠI ĐÂY: type="file" */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 bg-gray-50 hover:bg-white transition-colors cursor-pointer relative">
              <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer"/>
              <Upload className="mx-auto text-gray-400 mb-2" size={32}/>
              <p className="text-sm text-gray-600">{file ? file.name : "Click to select PDF"}</p>
            </div>
            <Button onClick={confirmUpload} className="w-full bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white">
              Confirm Upload
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};