import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, Download, Calendar, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', revenue: 12000, bookings: 150, patients: 120 },
  { month: 'Feb', revenue: 15000, bookings: 180, patients: 145 },
  { month: 'Mar', revenue: 18000, bookings: 200, patients: 160 },
  { month: 'Apr', revenue: 16000, bookings: 175, patients: 140 },
  { month: 'May', revenue: 20000, bookings: 220, patients: 180 },
];

const testTypeData = [
  { name: 'Blood Tests', value: 400, color: '#FFC0CB' },
  { name: 'Lipid Panel', value: 300, color: '#ADD8E6' },
  { name: 'Glucose', value: 200, color: '#FFD700' },
  { name: 'Other', value: 100, color: '#A9A9A9' },
];

export const ReportsPage = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState('Last 6 Months');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => navigate('/admin')} className="flex items-center gap-2 mb-4 text-[#A9A9A9] hover:text-[#333333]">
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <div className="flex justify-between items-center">
            <h1>Reports & Analytics</h1>
            <Button className="bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white">
              <Download size={20} className="mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl p-6">
        {/* Date Filter */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center gap-4">
            <Calendar size={20} className="text-[#A9A9A9]" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg"
            >
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
              <option>Custom Range</option>
            </select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#FFC0CB] to-[#FFB0BB] text-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm opacity-90">Total Revenue</h3>
              <TrendingUp size={20} />
            </div>
            <h2 className="text-3xl font-semibold mb-1">$81,000</h2>
            <p className="text-sm opacity-90">+12% from last period</p>
          </div>

          <div className="bg-gradient-to-br from-[#ADD8E6] to-[#9DC8D6] text-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm opacity-90">Total Bookings</h3>
              <TrendingUp size={20} />
            </div>
            <h2 className="text-3xl font-semibold mb-1">925</h2>
            <p className="text-sm opacity-90">+8% from last period</p>
          </div>

          <div className="bg-gradient-to-br from-[#FFD700] to-[#F0C700] text-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm opacity-90">Unique Patients</h3>
              <TrendingUp size={20} />
            </div>
            <h2 className="text-3xl font-semibold mb-1">745</h2>
            <p className="text-sm opacity-90">+15% from last period</p>
          </div>

          <div className="bg-gradient-to-br from-[#90EE90] to-[#80DE80] text-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm opacity-90">Avg Revenue/Booking</h3>
              <TrendingUp size={20} />
            </div>
            <h2 className="text-3xl font-semibold mb-1">$87.57</h2>
            <p className="text-sm opacity-90">+3% from last period</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="mb-4">Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#FFC0CB" strokeWidth={2} name="Revenue ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bookings Chart */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="mb-4">Bookings & Patients</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#ADD8E6" name="Bookings" />
                <Bar dataKey="patients" fill="#FFC0CB" name="Patients" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Test Types Distribution */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="mb-4">Test Types Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={testTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {testTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* AI Summary */}
        <div className="bg-gradient-to-r from-[#FFC0CB] to-[#ADD8E6] bg-opacity-10 rounded-lg p-6 mt-6">
          <h3 className="mb-2">AI Insights</h3>
          <p className="text-[#A9A9A9]">
            Based on the current trends, revenue is projected to increase by 15% next month. Blood tests remain the most popular service. 
            Consider increasing staffing for peak hours (10 AM - 2 PM) to reduce wait times.
          </p>
        </div>
      </div>
    </div>
  );
};