import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { ArrowLeft, Search, Plus, Edit, Trash2, UserCheck } from 'lucide-react';

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active', joined: 'Jan 15, 2026' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Customer', status: 'Active', joined: 'Jan 18, 2026' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Customer', status: 'Inactive', joined: 'Jan 10, 2026' },
  { id: 4, name: 'Admin User', email: 'admin123@gmail.com', role: 'Admin', status: 'Active', joined: 'Jan 1, 2026' },
];

export const UserManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => navigate('/admin')} className="flex items-center gap-2 mb-4 text-[#A9A9A9] hover:text-[#333333]">
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <div className="flex justify-between items-center">
            <h1>User Management</h1>
            <Button className="bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white">
              <Plus size={20} className="mr-2" />
              Add User
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl p-6">
        {/* Search Bar */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A9A9A9]" size={20} />
            <Input
              placeholder="Search users by name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">Joined</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#A9A9A9] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm">#{user.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#ADD8E6] rounded-full flex items-center justify-center">
                        <UserCheck size={16} className="text-white" />
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#A9A9A9]">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'Admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#A9A9A9]">{user.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-[#ADD8E6] hover:bg-opacity-20 rounded-lg">
                        <Edit size={16} className="text-[#ADD8E6]" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg">
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
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
