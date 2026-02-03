import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, FileText, Download, Eye } from 'lucide-react';

const results = [
  { id: 1, test: 'Complete Blood Count', date: 'Jan 20, 2026', status: 'Ready', critical: false },
  { id: 2, test: 'Lipid Panel', date: 'Jan 18, 2026', status: 'Ready', critical: false },
  { id: 3, test: 'Glucose Test', date: 'Jan 15, 2026', status: 'Ready', critical: true },
];

export const ViewResultsScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#FFC0CB] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => navigate('/home')} className="flex items-center gap-2 mb-2">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-white">Test Results</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 max-w-4xl">
        <div className="space-y-4">
          {results.map((result) => (
            <div key={result.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-[#ADD8E6] bg-opacity-30 rounded-lg flex items-center justify-center">
                  <FileText size={24} className="text-[#FFC0CB]" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3>{result.test}</h3>
                    {result.critical && (
                      <span className="px-3 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                        Critical
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#A9A9A9]">Completed on {result.date}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white">
                  <Eye size={16} className="mr-2" />
                  View Report
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Download size={16} className="mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};