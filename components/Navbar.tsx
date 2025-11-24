import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, LogOut, User as UserIcon, Map as MapIcon, Home, ShoppingBag, FileText, Gamepad2, Trophy, MessageCircle } from 'lucide-react';
import { User } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
  user: User | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  onToggleChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme, user, onLogout, onOpenAuth, onToggleChat }) => {
  const location = useLocation();
  
  const navItemClass = (path: string) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
    location.pathname === path 
      ? "text-releaf-500 bg-releaf-50 dark:bg-releaf-900/20" 
      : "text-slate-500 dark:text-slate-400 hover:text-releaf-500 dark:hover:text-releaf-400"
  }`;

  const buttonClass = "text-slate-500 dark:text-slate-400 hover:text-releaf-500 dark:hover:text-releaf-400 transition-colors";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-[#0B1120] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
             <Logo size={28} className="group-hover:scale-110 transition-transform duration-300" />
             <span className="text-xl font-bold text-slate-900 dark:text-white">Releaf</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
             <Link to="/" className={navItemClass('/')}>
                <Home size={18} />
                <span>Home</span>
             </Link>
             <Link to="/recycle" className={navItemClass('/recycle')}>
                <MapIcon size={18} />
                <span>Map</span>
             </Link>
             <Link to="/redeem" className={navItemClass('/redeem')}>
                <ShoppingBag size={18} />
                <span>Redeem</span>
             </Link>
             <Link to="/articles" className={navItemClass('/articles')}>
                <FileText size={18} />
                <span>Articles</span>
             </Link>
             <Link to="/games" className={navItemClass('/games')}>
                <Gamepad2 size={18} />
                <span>Games</span>
             </Link>
             <Link to="/leaderboard" className={navItemClass('/leaderboard')}>
                <Trophy size={18} />
                <span>Leaderboard</span>
             </Link>
             <button onClick={onToggleChat} className={buttonClass + " flex items-center gap-2 px-3 py-2"}>
                <MessageCircle size={18} />
                <span>Chatbot</span>
             </button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors text-sm font-medium"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 bg-releaf-600 hover:bg-releaf-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-releaf-500/30"
              >
                <UserIcon size={18} />
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className="lg:hidden flex justify-around border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0B1120] py-3">
        <Link to="/" className="p-2 text-slate-500 dark:text-slate-400 hover:text-releaf-500"><Home size={20} /></Link>
        <Link to="/recycle" className="p-2 text-slate-500 dark:text-slate-400 hover:text-releaf-500"><MapIcon size={20} /></Link>
        <Link to="/redeem" className="p-2 text-slate-500 dark:text-slate-400 hover:text-releaf-500"><ShoppingBag size={20} /></Link>
        <Link to="/leaderboard" className="p-2 text-slate-500 dark:text-slate-400 hover:text-releaf-500"><Trophy size={20} /></Link>
        <button onClick={onToggleChat} className="p-2 text-slate-500 dark:text-slate-400 hover:text-releaf-500"><MessageCircle size={20} /></button>
      </div>
    </nav>
  );
};
