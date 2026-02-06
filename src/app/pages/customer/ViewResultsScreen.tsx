import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, FileText, Download, Eye, Calendar, User } from 'lucide-react';
import { toast } from 'sonner';

export const ViewResultsScreen = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/appointments')
      .then(res => res.json())
      .then(data => {
        // Chỉ lấy những lịch đã có kết quả
        const ready = data.filter((a: any) => a.status === 'ResultsReady');
        setResults(ready);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDownload = () => {
    toast.success("Downloading PDF Report...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-6 pb-12 rounded-b-[2.5rem] shadow-lg">
        <div className="container mx-auto max-w-4xl">
          <button onClick={() => navigate('/home')} className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <ArrowLeft size={20}/> Back Home
          </button>
          <h1 className="text-3xl font-bold">Medical Results</h1>
          <p className="opacity-90 mt-2">Access your laboratory reports securely.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 pb-10 max-w-4xl">
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading records...</div>
        ) : results.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText size={32} className="text-gray-300"/>
            </div>
            <h3 className="text-lg font-bold text-gray-700">No Results Yet</h3>
            <p className="text-gray-500 mt-2 mb-6">Your test results will appear here once the lab completes the analysis.</p>
            <Button onClick={() => navigate('/doctors')} variant="outline" className="border-blue-200 text-blue-600">
              Book a New Test
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((res) => (
              <div key={res._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-start gap-4 w-full">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 flex-shrink-0">
                    <FileText size={24}/>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{res.doctorName}</h3>
                    <p className="text-blue-500 font-medium text-sm">{res.specialty} Report</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Calendar size={12}/> {res.date}</span>
                      <span className="flex items-center gap-1"><User size={12}/> {res.patientName || 'Me'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  <Button onClick={handleDownload} variant="outline" className="flex-1 md:flex-none border-gray-200 text-gray-600 hover:bg-gray-50">
                    <Download size={18} className="mr-2"/> PDF
                  </Button>
                  <Button className="flex-1 md:flex-none bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-200">
                    <Eye size={18} className="mr-2"/> View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};