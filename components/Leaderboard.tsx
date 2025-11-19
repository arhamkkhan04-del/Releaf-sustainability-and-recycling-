import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { User } from '../types';

interface LeaderboardProps {
  currentUser: User | null;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  diverted: number;
  avatar?: string;
}

const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank: 1, name: 'Arham Khan', points: 15420, diverted: 124.5 },
  { rank: 2, name: 'Muhammad Rayyan', points: 14850, diverted: 118.2 },
  { rank: 3, name: 'Hamdan', points: 12300, diverted: 98.7 },
  { rank: 4, name: 'Rishab', points: 11500, diverted: 92.1 },
  { rank: 5, name: 'Sarah Jenkins', points: 9800, diverted: 75.4 },
  { rank: 6, name: 'David Chen', points: 8500, diverted: 68.9 },
  { rank: 7, name: 'Emma Wilson', points: 7200, diverted: 55.3 },
  { rank: 8, name: 'Michael Brown', points: 6900, diverted: 52.1 },
];

export const Leaderboard: React.FC<LeaderboardProps> = ({ currentUser }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Community Leaderboard</h2>
        <p className="text-slate-500 dark:text-slate-400">Top eco-warriors making a difference.</p>
      </div>

      {/* Podium */}
      <div className="flex justify-center items-end gap-4 mb-16 h-64">
        {/* 2nd Place */}
        <div className="flex flex-col items-center w-1/3 sm:w-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-200 dark:bg-slate-700 border-4 border-slate-300 dark:border-slate-600 mb-4 flex items-center justify-center text-2xl overflow-hidden">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${LEADERBOARD_DATA[1].name}`} alt="avatar" />
          </div>
          <div className="text-center mb-2">
            <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{LEADERBOARD_DATA[1].name}</p>
            <p className="text-releaf-500 font-bold text-xs sm:text-sm">{LEADERBOARD_DATA[1].points} pts</p>
          </div>
          <div className="w-24 sm:w-32 h-32 bg-slate-300 dark:bg-slate-700 rounded-t-lg flex items-start justify-center pt-4 relative">
             <span className="text-4xl font-bold text-slate-400/50">2</span>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center w-1/3 sm:w-auto z-10 -mb-2">
           <div className="relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-400 animate-bounce">
                 <Trophy size={32} fill="currentColor" />
              </div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-yellow-100 dark:bg-yellow-900/30 border-4 border-yellow-400 mb-4 flex items-center justify-center text-2xl overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${LEADERBOARD_DATA[0].name}`} alt="avatar" />
              </div>
           </div>
          <div className="text-center mb-2">
            <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-lg">{LEADERBOARD_DATA[0].name}</p>
            <p className="text-releaf-500 font-bold text-xs sm:text-sm">{LEADERBOARD_DATA[0].points} pts</p>
          </div>
          <div className="w-28 sm:w-40 h-40 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-t-lg flex items-start justify-center pt-4 shadow-lg shadow-yellow-500/20">
             <span className="text-5xl font-bold text-white/80">1</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center w-1/3 sm:w-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-100 dark:bg-orange-900/30 border-4 border-orange-400 mb-4 flex items-center justify-center text-2xl overflow-hidden">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${LEADERBOARD_DATA[2].name}`} alt="avatar" />
          </div>
          <div className="text-center mb-2">
            <p className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">{LEADERBOARD_DATA[2].name}</p>
            <p className="text-releaf-500 font-bold text-xs sm:text-sm">{LEADERBOARD_DATA[2].points} pts</p>
          </div>
          <div className="w-24 sm:w-32 h-24 bg-orange-300 dark:bg-orange-800/80 rounded-t-lg flex items-start justify-center pt-4">
             <span className="text-4xl font-bold text-orange-900/30 dark:text-orange-100/30">3</span>
          </div>
        </div>
      </div>

      {/* List View */}
      <div className="bg-white dark:bg-[#1F2937] rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
         <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 dark:text-white">All Rankings</h3>
            <div className="text-sm text-slate-500">Updated 5m ago</div>
         </div>
         
         <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {LEADERBOARD_DATA.map((entry) => (
               <div key={entry.rank} className="p-4 flex items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="w-12 font-bold text-slate-400 text-xl text-center">{entry.rank}</div>
                  <div className="flex-1 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.name}`} alt="avatar" />
                     </div>
                     <div>
                        <p className="font-bold text-slate-900 dark:text-white">{entry.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 sm:hidden">{entry.diverted}kg diverted</p>
                     </div>
                  </div>
                  <div className="hidden sm:block text-right mr-8">
                     <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{entry.diverted} kg</p>
                     <p className="text-xs text-slate-400">Waste Diverted</p>
                  </div>
                  <div className="text-right w-24">
                     <p className="font-bold text-releaf-600 dark:text-releaf-400">{entry.points}</p>
                     <p className="text-xs text-slate-400">Points</p>
                  </div>
               </div>
            ))}
            
            {/* Current User Stats if logged in and not in top list (Mocking visual) */}
            {currentUser && !LEADERBOARD_DATA.find(u => u.name === currentUser.name) && (
               <div className="p-4 flex items-center bg-releaf-50 dark:bg-releaf-900/10 border-t-2 border-releaf-500">
                  <div className="w-12 font-bold text-releaf-600 text-xl text-center">124</div>
                  <div className="flex-1 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-releaf-200 dark:bg-releaf-800 flex items-center justify-center text-releaf-700">
                        <UserIcon size={20} />
                     </div>
                     <div>
                        <p className="font-bold text-slate-900 dark:text-white">You ({currentUser.name})</p>
                     </div>
                  </div>
                  <div className="hidden sm:block text-right mr-8">
                     <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{currentUser.wasteDivertedKg} kg</p>
                  </div>
                  <div className="text-right w-24">
                     <p className="font-bold text-releaf-600 dark:text-releaf-400">{currentUser.points}</p>
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

function UserIcon({size}: {size:number}) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
}