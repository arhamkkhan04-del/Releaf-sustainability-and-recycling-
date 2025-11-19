import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, Scale, Waves, MapPin } from 'lucide-react';
import { User } from '../types';

interface HeroProps {
  user: User | null;
  onOpenAuth: () => void;
}

export const Hero: React.FC<HeroProps> = ({ user, onOpenAuth }) => {
  // If User is logged in, show the "Dashboard" view
  if (user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-releaf-500 to-emerald-600 rounded-2xl p-8 sm:p-12 shadow-lg text-white flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-releaf-50 text-lg">
              Ready to make a difference today?
            </p>
          </div>
          <div className="text-center sm:text-right">
             <div className="flex items-center gap-2 justify-center sm:justify-end">
                <MapPin className="text-releaf-200" size={32} />
                <span className="text-4xl font-bold">{user.points}</span>
             </div>
             <p className="text-releaf-100 text-sm">Releaf Points</p>
          </div>
        </div>

        {/* Impact Section */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-releaf-500 mb-6 text-center sm:text-left">Your Impact</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Waste Diverted Card */}
            <div className="bg-[#1e3a8a] dark:bg-[#172554] rounded-2xl p-8 text-white shadow-xl flex flex-col items-center text-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                 <Scale size={120} />
               </div>
               <div className="p-4 mb-4 bg-blue-500/20 rounded-full">
                 <Scale size={40} className="text-blue-300" />
               </div>
               <h3 className="text-4xl font-bold mb-2">{user.wasteDivertedKg.toFixed(2)} kg</h3>
               <p className="text-blue-200 font-medium">Waste Diverted from Landfill</p>
            </div>

            {/* Ocean Card */}
            <div className="bg-[#0f766e] dark:bg-[#115e59] rounded-2xl p-8 text-white shadow-xl flex flex-col items-center text-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                 <Waves size={120} />
               </div>
               <div className="p-4 mb-4 bg-teal-400/20 rounded-full">
                 <Waves size={40} className="text-teal-300" />
               </div>
               <h3 className="text-4xl font-bold mb-2">{user.bottlesRecycled}</h3>
               <p className="text-teal-200 font-medium">Bottles Prevented from Entering the Ocean</p>
            </div>
          </div>
        </div>

        {/* Find Center CTA */}
        <div className="bg-[#111827] rounded-2xl p-8 sm:p-12 text-center border border-slate-800 shadow-2xl relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50"></div>
           <div className="relative z-10">
             <h2 className="text-2xl sm:text-3xl font-bold text-releaf-500 mb-4">Find a Recycling Center</h2>
             <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
               Drop off your recyclables at a nearby Releaf center to earn more points!
             </p>
             <Link 
               to="/recycle"
               className="inline-flex items-center gap-2 bg-releaf-600 hover:bg-releaf-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg shadow-releaf-900/20 hover:scale-105"
             >
               Find a Center Near You
             </Link>
           </div>
        </div>
      </div>
    );
  }

  // Logged Out View (Landing Page)
  return (
    <div className="flex flex-col">
      <section className="relative pt-20 pb-32 overflow-hidden bg-white dark:bg-[#0B1120]">
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-releaf-500/10 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-releaf-50 dark:bg-releaf-900/30 text-releaf-700 dark:text-releaf-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-releaf-500 animate-pulse"></span>
            Join the Releaf Movement
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Recycle for a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-releaf-500 to-teal-400">Greener Future</span>
          </h1>
          
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            Track your impact, earn rewards, and keep our oceans clean with Releaf's smart recycling network.
          </p>
          
          <div className="flex justify-center gap-4">
            <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-releaf-600 hover:bg-releaf-700 text-white font-bold text-lg transition-all hover:shadow-xl hover:shadow-releaf-500/20 hover:-translate-y-1"
              >
                Get Started
                <ArrowRight size={20} />
            </button>
            <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-lg transition-all"
              >
                Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-slate-50 dark:bg-[#111827]">
         <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
               <div className="bg-white dark:bg-[#1F2937] p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 bg-releaf-100 dark:bg-releaf-900/30 text-releaf-600 dark:text-releaf-400 rounded-xl flex items-center justify-center mb-6">
                     <Recycle size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Smart Recycling</h3>
                  <p className="text-slate-500 dark:text-slate-400">Locate nearby smart bins and get instant validation for your recyclables.</p>
               </div>
               <div className="bg-white dark:bg-[#1F2937] p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-6">
                     <Waves size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Ocean Impact</h3>
                  <p className="text-slate-500 dark:text-slate-400">See exactly how much waste you've diverted from entering our precious oceans.</p>
               </div>
               <div className="bg-white dark:bg-[#1F2937] p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center mb-6">
                     <MapPin size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Earn Rewards</h3>
                  <p className="text-slate-500 dark:text-slate-400">Redeem your points for eco-friendly products and discounts at partner stores.</p>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};