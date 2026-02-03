import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { ArrowLeft, MapPin, Phone, Clock, Navigation, Search } from 'lucide-react';
import { locations, Location } from '@/app/data/locations';

export const LocationsScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const filteredLocations = locations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.suburb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.postcode.includes(searchQuery)
  );

  const openInMaps = (location: Location) => {
    const query = encodeURIComponent(`${location.address}, ${location.suburb} ${location.state} ${location.postcode}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#FFC0CB] text-white p-4 md:p-6">
        <div className="container mx-auto max-w-6xl">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-2">
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <h1 className="text-white">Our Locations</h1>
          <p className="text-sm opacity-90 mt-1">Find a Luna Clinical center near you</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 max-w-6xl">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A9A9A9]" size={20} />
            <Input
              placeholder="Search by location, suburb, or postcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <p className="text-sm text-[#A9A9A9] mt-2">
            {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLocations.map((location) => (
            <div
              key={location.id}
              className={`border rounded-lg p-5 transition-all cursor-pointer ${
                selectedLocation?.id === location.id
                  ? 'border-[#FFC0CB] bg-[#FFC0CB] bg-opacity-5 shadow-md'
                  : 'border-gray-200 hover:border-[#FFC0CB] hover:shadow-md'
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-[#ADD8E6] bg-opacity-30 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-[#FFC0CB]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base mb-1">{location.name}</h3>
                  <p className="text-sm text-[#A9A9A9]">
                    {location.suburb}, {location.state} {location.postcode}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-sm">
                  <MapPin size={16} className="text-[#A9A9A9] mt-0.5 flex-shrink-0" />
                  <span className="text-[#A9A9A9]">{location.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={16} className="text-[#A9A9A9]" />
                  <span className="text-[#A9A9A9]">{location.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <Clock size={16} className="text-[#A9A9A9] mt-0.5 flex-shrink-0" />
                  <span className="text-[#A9A9A9]">{location.hours}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {location.services.map((service, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-[#ADD8E6] bg-opacity-20 text-[#A9A9A9] rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-[#FFC0CB] border-[#FFC0CB] hover:bg-[#FFC0CB] hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    openInMaps(location);
                  }}
                >
                  <Navigation size={14} className="mr-1" />
                  Directions
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-[#FFC0CB] hover:bg-[#FFB0BB] text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/doctors', { state: { locationId: location.id } });
                  }}
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <MapPin size={48} className="mx-auto text-[#A9A9A9] mb-4" />
            <p className="text-[#A9A9A9]">No locations found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
};