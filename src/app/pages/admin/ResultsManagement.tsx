import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { ArrowLeft, Upload, Eye, AlertCircle, FileText } from 'lucide-react';

const results = [
  { id: 1, bookingId: '#1234', patient: 'John Doe', test: 'Blood Test', status: 'Pending', critical: false, date: 'Jan 20, 2026' },
  { id: 2, bookingId: '#1235', patient: 'Jane Smith', test: 'Lipid Panel', status: 'Completed', critical: false, date: 'Jan 18, 2026' },
  { id: 3, bookingId: '#1236', patient: 'Mike Johnson', test: 'Glucose Test', status: 'Completed', critical: true, date: 'Jan 15, 2026' },
];

export const ResultsManagement = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => navigate('/admin')} className="flex items-center gap-2 mb-4 text-[#A9A9A9] hover:text-[#333333]">
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1>Results Management</h1>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl p-6">
        {/* Upload Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-6">
          <h2 className="mb-4">Upload Test Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Booking ID" />
            <div className="relative">
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" className="w-full">
                <Upload size={16} className="mr-2" />
                {selectedFile ? selectedFile.name : 'Choose PDF File'}
              </Button>
            </div>
            <Button className="bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white">
              Upload Result
            </Button>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">Test</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">Critical</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#A9A9A9] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {results.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">{result.bookingId}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#ADD8E6] rounded-full flex items-center justify-center">
                        <span className="text-xs">👤</span>
                      </div>
                      <span>{result.patient}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{result.test}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      result.status === 'Completed'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {result.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {result.critical ? (
                      <AlertCircle size={20} className="text-red-500" />
                    ) : (
                      <span className="text-[#A9A9A9]">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#A9A9A9]">{result.date}</td>
                  <td className="px-6 py-4 text-right">
                    <Button size="sm" variant="outline" className="mr-2">
                      <Eye size={16} className="mr-1" />
                      View
                    </Button>
                    {result.status === 'Pending' && (
                      <Button size="sm" className="bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white">
                        <Upload size={16} className="mr-1" />
                        Upload
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};