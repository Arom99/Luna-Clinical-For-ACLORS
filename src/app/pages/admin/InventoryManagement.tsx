import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, AlertCircle, Package, TrendingDown } from 'lucide-react';

const inventoryItems = [
  { id: 1, name: 'Blood Collection Tubes', stock: 150, reorderLevel: 50, status: 'Good', category: 'Supplies' },
  { id: 2, name: 'Test Reagents - CBC', stock: 25, reorderLevel: 30, status: 'Low', category: 'Reagents' },
  { id: 3, name: 'Sterile Gloves (Box)', stock: 80, reorderLevel: 40, status: 'Good', category: 'PPE' },
  { id: 4, name: 'Microscope Slides', stock: 15, reorderLevel: 50, status: 'Critical', category: 'Equipment' },
  { id: 5, name: 'Sample Labels', stock: 300, reorderLevel: 100, status: 'Good', category: 'Supplies' },
];

export const InventoryManagement = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Good':
        return 'bg-green-100 text-green-600';
      case 'Low':
        return 'bg-yellow-100 text-yellow-600';
      case 'Critical':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => navigate('/admin')} className="flex items-center gap-2 mb-4 text-[#A9A9A9] hover:text-[#333333]">
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <div className="flex justify-between items-center">
            <h1>Inventory Management</h1>
            <Button className="bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white">
              <Package size={20} className="mr-2" />
              Add Item
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl p-6">
        {/* Alert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#A9A9A9]">Total Items</p>
                <h2 className="text-2xl font-semibold mt-1">{inventoryItems.length}</h2>
              </div>
              <Package size={32} className="text-[#ADD8E6]" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#A9A9A9]">Low Stock Items</p>
                <h2 className="text-2xl font-semibold mt-1 text-yellow-600">
                  {inventoryItems.filter(i => i.status === 'Low').length}
                </h2>
              </div>
              <TrendingDown size={32} className="text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#A9A9A9]">Critical Stock</p>
                <h2 className="text-2xl font-semibold mt-1 text-red-600">
                  {inventoryItems.filter(i => i.status === 'Critical').length}
                </h2>
              </div>
              <AlertCircle size={32} className="text-red-500" />
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">Reorder Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#A9A9A9] uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#A9A9A9] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inventoryItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#ADD8E6] bg-opacity-20 rounded-lg flex items-center justify-center">
                        <Package size={20} className="text-[#ADD8E6]" />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#A9A9A9]">{item.category}</td>
                  <td className="px-6 py-4">
                    <span className="font-medium">{item.stock}</span> units
                  </td>
                  <td className="px-6 py-4 text-sm text-[#A9A9A9]">{item.reorderLevel} units</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      size="sm"
                      className={`${
                        item.status !== 'Good'
                          ? 'bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {item.status !== 'Good' ? 'Reorder' : 'Update'}
                    </Button>
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