import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ArrowLeft, Search, Star, MapPin, Heart } from 'lucide-react';
import { doctors } from '@/app/data/doctors';

export const DoctorsListScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState<string>(location.state?.locationId || 'all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const filters = ['All', 'Available Now', 'Top Rated'];

  // Get unique locations and specialties
  const locations = Array.from(new Set(doctors.map(d => d.location)));
  const specialties = Array.from(new Set(doctors.map(d => d.specialty)));

  // Filter doctors
  let filteredDoctors = doctors.filter(
    (doc) =>
      (doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedLocation === 'all' || doc.locationId === selectedLocation) &&
      (selectedSpecialty === 'all' || doc.specialty === selectedSpecialty)
  );

  if (selectedFilter === 'available-now') {
    filteredDoctors = filteredDoctors.filter(d => d.available);
  } else if (selectedFilter === 'top-rated') {
    filteredDoctors = filteredDoctors.filter(d => d.rating >= 4.8);
  }

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
        {/* Filters Row */}
        <div className="grid md:grid-cols-3 gap-3 mb-4">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={doctors.find(d => d.location === loc)?.locationId || loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger>
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              {specialties.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter.toLowerCase().replace(' ', '-'))}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${
                  selectedFilter === filter.toLowerCase().replace(' ', '-')
                    ? 'bg-[#FFC0CB] text-white'
                    : 'bg-gray-100 text-[#A9A9A9]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-[#A9A9A9] mb-4">
          {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
        </p>

        {/* Doctors Grid - Mobile: 1 col, Desktop: 2 cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDoctors.map((doctor) => (
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