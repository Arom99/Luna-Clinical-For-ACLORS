import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { ArrowLeft, Search, Star, MapPin, Heart } from 'lucide-react';

const doctors = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Pathologist', location: 'Sydney CBD', rating: 4.9, reviews: 156, available: true, favorite: false },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Lab Director', location: 'Parramatta', rating: 4.8, reviews: 142, available: true, favorite: true },
  { id: 3, name: 'Dr. Emma Williams', specialty: 'Clinical Pathologist', location: 'North Sydney', rating: 4.7, reviews: 98, available: false, favorite: false },
  { id: 4, name: 'Dr. James Brown', specialty: 'Hematologist', location: 'Bondi', rating: 4.9, reviews: 203, available: true, favorite: false },
];

export const DoctorsListScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = ['All', 'Available Now', 'Top Rated', 'Favorites'];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#FFC0CB] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate('/home')} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-white">Find Doctors</h1>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A9A9A9]" size={20} />
            <Input
              placeholder="Search doctors, specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-0"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 py-6 max-w-7xl">
        {/* Filters - Mobile: Scroll, Desktop: Flex */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter.toLowerCase().replace(' ', '-'))}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedFilter === filter.toLowerCase().replace(' ', '-')
                  ? 'bg-[#FFC0CB] text-white'
                  : 'bg-gray-100 text-[#A9A9A9]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Doctors Grid - Mobile: 1 col, Desktop: 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 bg-[#ADD8E6] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg">{doctor.name}</h3>
                    <button className={`p-1 ${doctor.favorite ? 'text-red-500' : 'text-gray-300'}`}>
                      <Heart size={20} fill={doctor.favorite ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <p className="text-sm text-[#A9A9A9] mb-2">{doctor.specialty}</p>
                  
                  <div className="flex items-center gap-4 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400" fill="currentColor" />
                      <span>{doctor.rating}</span>
                      <span className="text-[#A9A9A9]">({doctor.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#A9A9A9]">
                      <MapPin size={16} />
                      <span>{doctor.location}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/doctor/${doctor.id}`)}
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#FFC0CB] text-[#FFC0CB] hover:bg-[#FFC0CB] hover:text-white"
                    >
                      View Profile
                    </Button>
                    <Button
                      onClick={() => navigate(`/schedule/${doctor.id}`)}
                      size="sm"
                      className="flex-1 bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white"
                      disabled={!doctor.available}
                    >
                      {doctor.available ? 'Book Now' : 'Unavailable'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
