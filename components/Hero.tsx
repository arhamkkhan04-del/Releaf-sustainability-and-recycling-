import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, Scale, Waves, MapPin, QrCode, CheckCircle, Loader2, Leaf, Wind, Globe } from 'lucide-react';
import { User } from '../types';

interface HeroProps {
  user: User | null;
  onOpenAuth: () => void;
  onRecycle?: (bottles: number, weight: number, points: number) => void;
}

export const Hero: React.FC<HeroProps> = ({ user, onOpenAuth, onRecycle }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleQuickScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setShowSuccess(true);
      if (onRecycle) {
        onRecycle(5, 0.2, 50); // 5 bottles, 0.2kg, 50 points
      }
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  // --- LOGGED IN DASHBOARD ---
  if (user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-[float_0.3s_ease-out]">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-releaf-600 to-emerald-700 rounded-3xl p-8 sm:p-10 shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
             <Leaf size={300} />
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                Hi, {user.name}!
              </h1>
              <p className="text-releaf-100 text-lg max-w-md">
                You are doing great! Here is the positive impact you've made on the planet so far.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center sm:text-right min-w-[140px]">
               <div className="flex items-center gap-2 justify-center sm:justify-end">
                  <span className="text-4xl font-bold">{user.points}</span>
               </div>
               <p className="text-releaf-100 text-sm font-medium">Available Points</p>
            </div>
          </div>
        </div>

        {/* IMPACT STATS (New Section) */}
        <div>
           <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
             <Globe size={20} className="text-ocean-500" />
             Your Eco Impact
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Waste Diverted */}
              <div className="bg-white dark:bg-[#1F2937] p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                    <Scale size={24} />
                 </div>
                 <div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Waste Diverted</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{user.wasteDivertedKg.toFixed(1)} <span className="text-sm font-normal text-slate-400">kg</span></p>
                 </div>
              </div>

              {/* Ocean Saved */}
              <div className="bg-white dark:bg-[#1F2937] p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-ocean-100 dark:bg-ocean-900/30 flex items-center justify-center text-ocean-600 dark:text-ocean-400">
                    <Waves size={24} />
                 </div>
                 <div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">Ocean Rescue</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{user.bottlesRecycled} <span className="text-sm font-normal text-slate-400">items</span></p>
                    <p className="text-[10px] text-green-500">Saved from waterways</p>
                 </div>
              </div>

              {/* CO2 Offset */}
              <div className="bg-white dark:bg-[#1F2937] p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Wind size={24} />
                 </div>
                 <div>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">CO₂ Reduced</p>
                    {/* Approx calculation: 1kg plastic = ~1.5kg CO2e saved by recycling vs virgin production */}
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{(user.wasteDivertedKg * 1.5).toFixed(1)} <span className="text-sm font-normal text-slate-400">kg</span></p>
                 </div>
              </div>
           </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-slate-50 dark:bg-[#151e32] rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-700/50">
           <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h2>
           <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleQuickScan}
                disabled={isScanning || showSuccess}
                className="flex-1 bg-releaf-600 hover:bg-releaf-700 disabled:bg-releaf-500 text-white p-6 rounded-2xl flex items-center justify-between group transition-all shadow-lg shadow-releaf-500/20 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-4 relative z-10">
                   <div className="bg-white/20 p-3 rounded-xl">
                      {isScanning ? <Loader2 className="animate-spin" /> : showSuccess ? <CheckCircle /> : <QrCode />}
                   </div>
                   <div className="text-left">
                      <h3 className="font-bold text-lg">
                        {isScanning ? 'Scanning...' : showSuccess ? 'Drop-off Complete!' : 'Scan & Drop-off'}
                      </h3>
                      <p className="text-releaf-100 text-sm">
                        {isScanning ? 'Verifying location...' : showSuccess ? '+50 Points Added' : 'At a center? Scan bin QR code.'}
                      </p>
                   </div>
                </div>
                <ArrowRight className={`transition-transform ${isScanning || showSuccess ? 'opacity-0' : 'group-hover:translate-x-1'}`} />
              </button>

              <Link to="/recycle" className="flex-1 bg-white dark:bg-[#1F2937] border border-slate-200 dark:border-slate-700 hover:border-releaf-500 dark:hover:border-releaf-500 p-6 rounded-2xl flex items-center justify-between group transition-all text-slate-900 dark:text-white shadow-sm hover:shadow-md">
                 <div className="flex items-center gap-4">
                   <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl text-releaf-600 dark:text-releaf-400 group-hover:bg-releaf-50 dark:group-hover:bg-releaf-900/20 transition-colors">
                      <MapPin />
                   </div>
                   <div className="text-left">
                      <h3 className="font-bold text-lg">Find Centers</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Locate nearest drop-off point</p>
                   </div>
                </div>
                <ArrowRight className="text-slate-300 group-hover:text-releaf-500 transition-colors" />
              </Link>
           </div>
        </div>
      </div>
    );
  }

  // --- LANDING PAGE (Guest) ---
  return (
    <div className="animate-[float_0.5s_ease-out]">
      {/* Hero Banner */}
      <div className="relative bg-[#0f172a] overflow-hidden">
         {/* Background Image with Overlay */}
         <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=2000" 
             alt="Ocean Plastic" 
             className="w-full h-full object-cover opacity-40"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent"></div>
         </div>

         <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 bg-releaf-500/20 text-releaf-300 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-releaf-500/30">
               <Leaf size={16} />
               <span>The #1 Sustainability App</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl">
               Save the Ocean, <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-releaf-400 to-ocean-400">One Bottle at a Time.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl">
               Join a community of eco-warriors. Track your recycling habits, earn rewards for sustainable choices, and see the real impact you make on our planet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
               <button 
                 onClick={onOpenAuth}
                 className="px-8 py-4 bg-releaf-600 hover:bg-releaf-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-releaf-600/30 flex items-center justify-center gap-2"
               >
                  Get Started
                  <ArrowRight size={20} />
               </button>
               <button 
                 onClick={onOpenAuth}
                 className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all backdrop-blur-md border border-white/10"
               >
                  View Leaderboard
               </button>
            </div>
         </div>
      </div>

      {/* Global Impact Stats */}
      <div className="bg-white dark:bg-[#0B1120] py-16 border-b border-slate-100 dark:border-slate-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Our Collective Impact</h2>
               <p className="text-slate-500 dark:text-slate-400">See what the Releaf community has achieved together.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-6 rounded-3xl bg-ocean-50 dark:bg-ocean-900/10 border border-ocean-100 dark:border-ocean-800 text-center">
                  <div className="w-16 h-16 mx-auto bg-ocean-100 dark:bg-ocean-800 rounded-full flex items-center justify-center text-ocean-600 dark:text-ocean-400 mb-4">
                     <Waves size={32} />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">2.5M+</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Bottles Saved from Oceans</p>
               </div>
               
               <div className="p-6 rounded-3xl bg-releaf-50 dark:bg-releaf-900/10 border border-releaf-100 dark:border-releaf-800 text-center">
                  <div className="w-16 h-16 mx-auto bg-releaf-100 dark:bg-releaf-800 rounded-full flex items-center justify-center text-releaf-600 dark:text-releaf-400 mb-4">
                     <Scale size={32} />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">850k kg</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Waste Diverted from Landfills</p>
               </div>

               <div className="p-6 rounded-3xl bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-800 text-center">
                  <div className="w-16 h-16 mx-auto bg-yellow-100 dark:bg-yellow-800 rounded-full flex items-center justify-center text-yellow-600 dark:text-yellow-400 mb-4">
                     <Globe size={32} />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">150k+</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-medium">Active Eco-Warriors</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
