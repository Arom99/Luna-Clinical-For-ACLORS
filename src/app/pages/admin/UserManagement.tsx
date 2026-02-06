import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { ArrowLeft, Search, Plus, Edit, Trash2, X, Save, Lock } from 'lucide-react';
import { toast } from 'sonner';

export const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  
  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>({ 
    name: '', email: '', password: '', role: 'Customer', phone: '', status: 'Active' 
  });

  // Load users safely
  const fetchUsers = () => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        // Đảm bảo data là mảng để tránh lỗi .filter()
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([]); 
        }
      })
      .catch(() => setUsers([]));
  };

  useEffect(() => { fetchUsers(); }, []);

  // --- ACTIONS ---

  const handleDelete = async (id: string) => {
    if(!confirm("Delete this user?")) return;
    try {
      await fetch(`http://localhost:5000/users/${id}`, { method: 'DELETE' });
      toast.success("User deleted");
      fetchUsers();
    } catch (e) { toast.error("Delete failed"); }
  };

  const handleSave = async () => {
    if (!currentUser.name || !currentUser.email) {
      toast.error("Please fill in Name and Email");
      return;
    }
    
    // Kiểm tra password khi tạo mới
    if (!isEditing && !currentUser.password) {
      toast.error("Password is required for new users");
      return;
    }

    const url = isEditing ? `http://localhost:5000/users/${currentUser._id}` : 'http://localhost:5000/users';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentUser)
      });
      
      const data = await res.json();
      
      if(res.ok) {
        toast.success(isEditing ? "User Updated" : "User Created Successfully");
        setShowModal(false);
        fetchUsers();
      } else {
        toast.error(data.error || "Operation Failed");
      }
    } catch (e) { toast.error("Connection Error"); }
  };

  const openEdit = (user: any) => {
    setCurrentUser({ ...user, password: '' }); // Password để trống khi edit (không bắt buộc đổi)
    setIsEditing(true);
    setShowModal(true);
  };

  const openAdd = () => {
    setCurrentUser({ name: '', email: '', password: '', role: 'Customer', phone: '', status: 'Active' });
    setIsEditing(false);
    setShowModal(true);
  };

  const filtered = users.filter(u => 
    (u.name || '').toLowerCase().includes(search.toLowerCase()) || 
    (u.email || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Button variant="ghost" onClick={() => navigate('/admin')} className="mb-4 text-gray-500 hover:text-pink-500 hover:bg-pink-50">
        <ArrowLeft size={16} className="mr-2"/> Dashboard
      </Button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <Button onClick={openAdd} className="bg-[#FFC0CB] text-white hover:bg-[#FFB0BB] shadow-sm hover:shadow-md transition-all">
          <Plus size={20} className="mr-2"/> Add User
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
          <Input 
            placeholder="Search users..." 
            className="pl-10 border-gray-200 focus:border-[#FFC0CB] focus:ring-1 focus:ring-[#FFC0CB]" 
            value={search} 
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="p-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(user => (
              <tr key={user._id} className="hover:bg-pink-50/30 transition-colors">
                <td className="p-4 font-medium text-gray-800">{user.name}</td>
                <td className="p-4 text-gray-600">{user.email}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{user.role}</span></td>
                <td className="p-4 text-gray-600">{user.phone}</td>
                <td className="p-4 text-right">
                  <button onClick={() => openEdit(user)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg mr-2 transition-colors"><Edit size={16}/></button>
                  <button onClick={() => handleDelete(user._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- ADD / EDIT MODAL (PINK BLUR BACKGROUND) --- */}
      {showModal && (
        <div className="fixed inset-0 bg-[#FFC0CB]/20 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white p-8 rounded-2xl w-96 shadow-2xl border border-pink-100 transform transition-all scale-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-gray-800">{isEditing ? 'Edit User' : 'Add New User'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={24}/></button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Name</label>
                <Input value={currentUser.name} onChange={e => setCurrentUser({...currentUser, name: e.target.value})} className="bg-gray-50 focus:bg-white transition-colors"/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                <Input value={currentUser.email} onChange={e => setCurrentUser({...currentUser, email: e.target.value})} className="bg-gray-50 focus:bg-white transition-colors"/>
              </div>
              
              {/* PASSWORD INPUT */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Lock size={14}/> Password {isEditing && <span className="text-gray-400 text-xs font-normal">(Optional)</span>}</label>
                <Input 
                  type="password" 
                  value={currentUser.password} 
                  onChange={e => setCurrentUser({...currentUser, password: e.target.value})}
                  placeholder={isEditing ? "********" : "Enter password"}
                  className="bg-gray-50 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Phone</label>
                <Input value={currentUser.phone} onChange={e => setCurrentUser({...currentUser, phone: e.target.value})} className="bg-gray-50 focus:bg-white transition-colors"/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Role</label>
                <select 
                  className="w-full border rounded-md p-2 bg-gray-50 focus:bg-white transition-colors text-sm" 
                  value={currentUser.role} 
                  onChange={e => setCurrentUser({...currentUser, role: e.target.value})}
                >
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              
              <Button onClick={handleSave} className="w-full bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white mt-6 h-11 text-base shadow-md hover:shadow-lg transition-all">
                <Save size={18} className="mr-2"/> Save User
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};