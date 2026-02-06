import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { ArrowLeft, Package, Plus, ShoppingCart, Loader2, Save, X } from 'lucide-react';
import { toast } from 'sonner';

export const InventoryManagement = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New Item Form
  const [newItem, setNewItem] = useState({ name: '', category: 'Supplies', stock: 100, reorderLevel: 20 });

  const fetchInventory = () => {
    fetch('http://localhost:5000/inventory')
      .then(res => res.json())
      .then(data => { setItems(data); setLoading(false); });
  };

  useEffect(() => { fetchInventory(); }, []);

  const handleAddItem = async () => {
    try {
      const res = await fetch('http://localhost:5000/inventory', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newItem)
      });
      if (res.ok) {
        toast.success("Item Added!");
        setShowAddModal(false);
        fetchInventory();
      }
    } catch (e) { toast.error("Failed to add item"); }
  };

  const handleOrder = async (id: string) => {
    try {
      await fetch('http://localhost:5000/inventory/order', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ itemId: id, quantity: 50 })
      });
      toast.success("Stock Ordered (+50)");
      fetchInventory();
    } catch (e) { toast.error("Order Failed"); }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">
      <Button variant="ghost" onClick={() => navigate('/admin')} className="mb-4">
        <ArrowLeft size={16} className="mr-2"/> Dashboard
      </Button>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory</h1>
        <Button onClick={() => setShowAddModal(true)} className="bg-[#FFC0CB] hover:bg-[#FFB0BB]">
          <Plus size={20} className="mr-2"/> Add Item
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left">Item Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4 text-gray-500">{item.category}</td>
                <td className="p-4 font-bold">{item.stock}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${item.status === 'Good' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Button size="sm" onClick={() => handleOrder(item._id)} variant="outline">
                    <ShoppingCart size={14} className="mr-2"/> Order +50
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Item Modal (Simple Overlay) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-lg">Add New Inventory Item</h3>
              <button onClick={() => setShowAddModal(false)}><X size={20}/></button>
            </div>
            <div className="space-y-4">
              <div><label>Name</label><Input value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})}/></div>
              <div><label>Category</label><Input value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}/></div>
              <div className="grid grid-cols-2 gap-2">
                <div><label>Stock</label><Input type="number" value={newItem.stock} onChange={e => setNewItem({...newItem, stock: Number(e.target.value)})}/></div>
                <div><label>Reorder Level</label><Input type="number" value={newItem.reorderLevel} onChange={e => setNewItem({...newItem, reorderLevel: Number(e.target.value)})}/></div>
              </div>
              <Button onClick={handleAddItem} className="w-full bg-[#FFC0CB] mt-2">Save Item</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};