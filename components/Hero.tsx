import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, Scale, Waves, MapPin, QrCode, CheckCircle, Loader2 } from 'lucide-react';
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

  // If User is logged in, show the "Dashboard" view
  if (user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-[float_0.3s_ease-out]">
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

        {/* Quick Actions Section */}
        <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-8 border border-slate-100 dark:border-slate-700 shadow-lg">
           <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Quick Actions</h2>
           <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleQuickScan}
                disabled={isScanning || showSuccess}
                className="flex-1 bg-releaf-600 hover:bg-releaf-700 disabled:bg-releaf-500 text-white p-6 rounded-xl flex items-center justify-between group transition-all shadow-lg shadow-releaf-500/20"
              >
                <div className="flex items-center gap-4">
                   <div className="bg-white/20 p-3 rounded-lg">
                      {isScanning ? <Loader2 className="animate-spin" /> : showSuccess ? <CheckCircle /> : <QrCode />}
                   </div>
                   <div className="text-left">
                      <h3 className="font-bold text-lg">
                        {isScanning ? 'Scanning...' : showSuccess ? 'Drop-off Complete!' : 'Scan & Drop-off'}
                      </h3>
                      <p className="text-releaf-100 text-sm">
                        {isScanning ? 'Verifying location...' : showSuccess ? '+50 Points Added' : 'At a center? Scan to earn.'}
                      </p>
                   </div>
                </div>
                <ArrowRight className={`transition-transform ${isScanning || showSuccess ? 'opacity-0' : 'group-hover:translate-x-1'}`} />
              </button>

              <Link to="/recycle" className="flex-1 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 hover:border-releaf-500 dark:hover:border-releaf-500 p-6 rounded-xl flex items-center justify-between group transition-all text-slate-900 dark:text-white">
                 <div className="flex items-center gap-4">
                   <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg text-releaf-600 dark:text-releaf-400">
                      <MapPin />
                   </div>
                   <div className="text-left">
                      <h3 className="font-bold text-lg">Find Centers</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm">Locate nearest drop-off point</p>
                   </div>
