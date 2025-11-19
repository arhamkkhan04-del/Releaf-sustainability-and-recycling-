import React, { useState } from 'react';
import { User } from '../types';
import { MapPin, Navigation, Clock, Search, Filter, Phone, Star, ArrowRight } from 'lucide-react';

interface RecycleProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

interface Center {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  status: 'Open' | 'Closed' | 'Closing Soon';
  items: string[];
  coordinates: { x: number; y: number }; // Percentage for mock map
}

const RECYCLING_CENTERS: Center[] = [
  {
    id: '1',
    name: 'Green City Hub',
    address: '124 Eco Avenue, Downtown',
    distance: '0.5 mi',
    rating: 4.8,
    status: 'Open',
    items: ['Plastic', 'Glass', 'Paper'],
    coordinates: { x: 40, y: 30 }
  },
  {
    id: '2',
    name: 'Releaf Smart Bin #402',
    address: 'Central Park West Entrance',
    distance: '1.2 mi',
    rating: 4.5,
    status: 'Open',
    items: ['Bottles', 'Cans'],
    coordinates: { x: 60, y: 50 }
  },
  {
    id: '3',
    name: 'Metro Recycling Station',
    address: '89 Industrial Blvd',
    distance: '3.4 mi',
    rating: 4.2,
    status: 'Closing Soon',
    items: ['Electronics', 'Batteries', 'Large Plastics'],
    coordinates: { x: 25, y: 70 }
  },
  {
    id: '4',
    name: 'Community Drop-off',
    address: 'Lincoln High School Parking',
    distance: '4.1 mi',
    rating: 4.9,
    status: 'Closed',
    items: ['Paper', 'Cardboard'],
    coordinates: { x: 75, y: 20 }
  }
];

export const Recycle: React.FC<RecycleProps> = ({ user, onUpdateUser }) => {
  const [selectedCenter, setSelectedCenter] = useState<Center>(RECYCLING_CENTERS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCenters = RECYCLING_CENTERS.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.items.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleGetDirections = () => {
    const query = encodeURIComponent(selectedCenter.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] bg-white dark:bg-[#0B1120]">
      
      {/* Sidebar / List View */}
      <div className="w-full lg:w-[400px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1120] z-10 shadow-xl lg:shadow-none">
        
        {/* Header & Search */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1120]">
           <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
             <MapPin className="text-releaf-500" />
             Find a Center
           </h2>
           <div className="relative">
             <input 
               type="text" 
               placeholder="Search centers or materials..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-10 pr-4 py-3 bg-slate-100 dark:bg-slate-900 border-transparent focus:bg-white dark:focus:bg-slate-900 border focus:border-releaf-500 rounded-xl outline-none transition-all text-slate-900 dark:text-white placeholder-slate-500"
             />
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-releaf-500">
               <Filter size={18} />
             </button>
           </div>
        </div>

        {/* Center List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
           {filteredCenters.map(center => (
             <div 
               key={center.id}
               onClick={() => setSelectedCenter(center)}
               className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                 selectedCenter.id === center.id
                   ? 'bg-releaf-50 dark:bg-releaf-900/20 border-releaf-500 ring-1 ring-releaf-500'
                   : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 hover:border-releaf-300 dark:hover:border-releaf-700'
               }`}
             >
               <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-slate-900 dark:text-white">{center.name}</h3>
                 <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                   center.status === 'Open' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                   center.status === 'Closing Soon' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                   'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                 }`}>
                   {center.status}
                 </span>
               </div>
               <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm mb-3">
                  <MapPin size={14} />
                  <span className="truncate">{center.address}</span>
               </div>
               <div className="flex flex-wrap gap-2 mb-3">
                 {center.items.slice(0, 3).map(item => (
                   <span key={item} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md">
                     {item}
                   </span>
                 ))}
               </div>
               <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star size={14} fill="currentColor" />
                    {center.rating}
                  </div>
                  <div className="flex items-center gap-1 text-releaf-600 dark:text-releaf-400 font-medium">
                    <Navigation size={14} />
                    {center.distance}
                  </div>
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-slate-200 dark:bg-[#151e32] overflow-hidden">
        {/* Mock Map Background Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
        </div>
        
        {/* Mock River/Roads for visuals */}
        <div className="absolute inset-0 pointer-events-none">
           {/* River */}
           <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,30 C20,25 40,35 60,30 S90,20 100,25" fill="none" stroke="#3b82f6" strokeWidth="3" strokeOpacity="0.1" />
              <path d="M40,0 C45,20 35,40 40,100" fill="none" stroke="#64748b" strokeWidth="2" strokeOpacity="0.1" />
              <path d="M0,60 C30,60 70,60 100,60" fill="none" stroke="#64748b" strokeWidth="2" strokeOpacity="0.1" />
           </svg>
        </div>

        {/* Map Markers */}
        {RECYCLING_CENTERS.map((center) => (
          <div
            key={center.id}
            onClick={() => setSelectedCenter(center)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group ${
              selectedCenter.id === center.id ? 'scale-125 z-20' : 'scale-100 z-10 hover:scale-110'
            }`}
            style={{ top: `${center.coordinates.y}%`, left: `${center.coordinates.x}%` }}
          >
            <div className="relative">
               {/* Pulse Effect for Selected */}
               {selectedCenter.id === center.id && (
                 <div className="absolute inset-0 bg-releaf-500 rounded-full animate-ping opacity-20 w-full h-full scale-150"></div>
               )}
               
               {/* Pin Icon */}
               <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 ${
                 selectedCenter.id === center.id 
                  ? 'bg-releaf-600 border-white text-white' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-releaf-600'
               }`}>
                 <MapPin size={20} fill={selectedCenter.id === center.id ? 'currentColor' : 'none'} />
               </div>
               
               {/* Tooltip on Hover */}
               <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white dark:bg-slate-800 px-3 py-1 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold whitespace-nowrap text-slate-900 dark:text-white pointer-events-none">
                 {center.name}
               </div>
            </div>
          </div>
        ))}

        {/* Selected Center Detail Overlay (Mobile/Desktop) */}
        <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-white dark:bg-[#1F2937] p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 backdrop-blur-md bg-opacity-90 dark:bg-opacity-90 animate-[float_0.5s_ease-out]">
           <div className="flex justify-between items-start mb-4">
              <div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{selectedCenter.name}</h3>
                 <p className="text-slate-500 dark:text-slate-400 text-sm">{selectedCenter.address}</p>
              </div>
              <div className="bg-releaf-100 dark:bg-releaf-900/30 p-2 rounded-lg text-releaf-600 dark:text-releaf-400">
                 <Navigation size={20} />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                 <Clock size={16} className="text-releaf-500" />
                 <span>08:00 AM - 08:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                 <Phone size={16} className="text-releaf-500" />
                 <span>(555) 123-4567</span>
              </div>
           </div>

           <div className="space-y-3">
              <button 
                onClick={handleGetDirections}
                className="w-full bg-releaf-600 hover:bg-releaf-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-releaf-500/20 flex items-center justify-center gap-2"
              >
                 <Navigation size={18} />
                 Get Directions
              </button>
              <button className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                 View Details
                 <ArrowRight size={18} />
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};