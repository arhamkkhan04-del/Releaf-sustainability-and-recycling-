import React, { useState } from 'react';
import { User, RewardItem } from '../types';
import { ShoppingBag, CheckCircle, Award } from 'lucide-react';

const DUMMY_REWARDS: RewardItem[] = [
  { id: '1', name: 'Bamboo Toothbrush', cost: 150, image: 'https://picsum.photos/id/1060/300/300', description: 'Biodegradable natural bamboo handle.' },
  { id: '2', name: 'Reusable Tote Bag', cost: 300, image: 'https://picsum.photos/id/103/300/300', description: 'Organic cotton, sturdy for groceries.' },
  { id: '3', name: 'Metal Straw Set', cost: 250, image: 'https://picsum.photos/id/146/300/300', description: 'Stainless steel with cleaning brush.' },
  { id: '4', name: 'Plant a Tree', cost: 500, image: 'https://picsum.photos/id/1047/300/300', description: 'We will plant a tree in your name.' },
  { id: '5', name: 'Eco Water Bottle', cost: 800, image: 'https://picsum.photos/id/445/300/300', description: 'Insulated bottle keeps water cold.' },
  { id: '6', name: 'Solar Power Bank', cost: 1200, image: 'https://picsum.photos/id/1/300/300', description: 'Charge devices using solar energy.' },
  { id: '7', name: 'Organic T-Shirt', cost: 1500, image: 'https://picsum.photos/id/998/300/300', description: '100% Organic Cotton, fair trade.' },
  { id: '8', name: 'Compost Bin', cost: 2000, image: 'https://picsum.photos/id/292/300/300', description: 'Start composting your kitchen waste.' },
];

interface RedeemProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

export const Redeem: React.FC<RedeemProps> = ({ user, onUpdateUser }) => {
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  const handleRedeem = (item: RewardItem) => {
    if (user.points < item.cost) {
      return;
    }
    
    onUpdateUser({
      ...user,
      points: user.points - item.cost
    });
    setShowSuccess(`Redeemed ${item.name}!`);
    setTimeout(() => setShowSuccess(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header Section with Points Balance */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Rewards Marketplace</h2>
          <p className="text-slate-500 dark:text-slate-400">Use your hard-earned points to get eco-friendly gear.</p>
        </div>

        <div className="bg-gradient-to-r from-eco-600 to-eco-700 text-white px-8 py-4 rounded-2xl shadow-lg shadow-eco-500/20 flex items-center gap-4">
           <div className="p-3 bg-white/20 rounded-xl">
             <Award size={24} />
           </div>
           <div>
             <p className="text-eco-100 text-sm font-medium">Your Balance</p>
             <p className="text-3xl font-bold">{user.points} <span className="text-lg font-normal opacity-80">pts</span></p>
           </div>
        </div>
      </div>

      {/* Marketplace Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {DUMMY_REWARDS.map(item => {
          const canAfford = user.points >= item.cost;
          return (
            <div key={item.id} className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                {!canAfford && (
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="bg-slate-900/80 text-white px-3 py-1 rounded-full text-xs font-bold">Need {item.cost - user.points} more pts</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{item.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{item.description}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className={`font-bold text-lg ${canAfford ? 'text-eco-600 dark:text-eco-400' : 'text-slate-400'}`}>{item.cost} pts</span>
                  <button 
                    onClick={() => handleRedeem(item)}
                    disabled={!canAfford}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      canAfford 
                        ? 'bg-slate-900 text-white hover:bg-eco-600 dark:bg-white dark:text-slate-900 dark:hover:bg-eco-400 dark:hover:text-slate-900 shadow-lg shadow-slate-200 dark:shadow-none' 
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500'
                    }`}
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast Notification */}
      {showSuccess && (
        <div className="fixed bottom-10 right-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce z-50">
          <CheckCircle className="text-eco-500" />
          <span className="font-semibold">{showSuccess}</span>
        </div>
      )}
    </div>
  );
};