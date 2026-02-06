import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ArrowLeft, Search, Star, MapPin, Heart } from 'lucide-react';

export const DoctorsListScreen = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  useEffect(() => {
    fetch('http://localhost:5000/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  // Filter Logic
  const filtered = doctors.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesLoc = selectedLocation === 'all' || d.location === selectedLocation;
    const matchesSpec = selectedSpecialty === 'all' || d.specialty === selectedSpecialty;
    return matchesSearch && matchesLoc && matchesSpec;
  });

  // Unique values for dropdowns
  const uniqueLocations = Array.from(new Set(doctors.map(d => d.location)));
  const uniqueSpecialties = Array.from(new Set(doctors.map(d => d.specialty)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER MÀU HỒNG GỐC (#FFC0CB) */}
      <div className="bg-[#FFC0CB] text-white p-6 pb-12 rounded-b-[2.5rem] shadow-lg">
        <div className="container mx-auto max-w-7xl">
          <button onClick={() => navigate('/home')} className="flex items-center gap-2 mb-6 hover:opacity-80"><ArrowLeft size={20}/> Back</button>
          <h1 className="text-3xl font-bold mb-4">Find Doctors</h1>
          
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-[#FFC0CB]" size={20}/>
            <Input 
              placeholder="Search by name, specialist..." 
              className="pl-12 h-12 rounded-2xl bg-white border-0 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-white/50"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-6 pb-10 max-w-7xl">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-2">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[140px] rounded-full bg-white border-gray-200 shadow-sm">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {uniqueLocations.map((loc: any) => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
            </SelectContent>
          </Select>

          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-[150px] rounded-full bg-white border-gray-200 shadow-sm">
              <SelectValue placeholder="Specialty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              {uniqueSpecialties.map((spec: any) => <SelectItem key={spec} value={spec}>{spec}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(doc => (
            <div key={doc.id} className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex gap-4 group">
              <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:bg-[#FFC0CB]/20 transition-colors">
                👨‍⚕️
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{doc.name}</h3>
                    <p className="text-[#FFC0CB] text-sm font-medium">{doc.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold bg-yellow-50 text-yellow-600 px-2 py-1 rounded-lg">
                    <Star size={12} fill="currentColor"/> {doc.rating}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-xs mt-2 mb-4">
                  <MapPin size={12}/> {doc.location}
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => navigate(`/schedule/${doc.id}`)} 
                    className="flex-1 bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white rounded-xl h-10 text-sm shadow-sm"
                  >
                    Book Now
                  </Button>
                  <Button variant="outline" className="h-10 w-10 p-0 rounded-xl border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200">
                    <Heart size={18}/>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};