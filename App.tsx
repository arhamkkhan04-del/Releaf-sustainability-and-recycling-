import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Redeem } from './components/Redeem';
import { Recycle } from './components/Recycle';
import { ChatBot } from './components/ChatBot';
import { Auth } from './components/Auth';
import { Articles } from './components/Articles';
import { Games } from './components/Games';
import { Leaderboard } from './components/Leaderboard';
import { User } from './types';

// Reusable component for protected routes
interface ProtectedRouteProps {
  user: User | null;
  children: React.ReactNode;
  onOpenAuth: () => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, children, onOpenAuth }) => {
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-[float_0.5s_ease-out]">
        <div className="bg-releaf-100 dark:bg-releaf-900/30 p-6 rounded-full mb-6 text-releaf-600 dark:text-releaf-400">
           <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Login Required</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
          Please sign in to access this feature, track your recycling progress, and redeem rewards.
        </p>
        <button 
          onClick={onOpenAuth}
          className="px-8 py-3 rounded-xl bg-releaf-600 hover:bg-releaf-700 text-white font-bold transition-all shadow-lg shadow-releaf-500/30"
        >
          Sign In Now
        </button>
      </div>
    );
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  // State
  const [darkMode, setDarkMode] = useState(true); // Default to dark as per screenshots
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Effect for Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Effect to restore session
  useEffect(() => {
    const storedUser = localStorage.getItem('releafUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handlers
  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  const handleLogin = (name: string) => {
    const newUser: User = {
      name,
      email: 'user@example.com',
      points: 0, 
      wasteDivertedKg: 0,
      bottlesRecycled: 0
    };
    // Restore if exists (mock)
    const existing = localStorage.getItem('releafUser');
    if (existing) {
       const parsed = JSON.parse(existing);
       if (parsed.name === name) {
           setUser(parsed);
           setIsAuthOpen(false);
           return;
       }
    }
    
    setUser(newUser);
    localStorage.setItem('releafUser', JSON.stringify(newUser));
    setIsAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('releafUser');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('releafUser', JSON.stringify(updatedUser));
  };

  const handleRecycle = (bottles: number, weight: number, points: number) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      bottlesRecycled: user.bottlesRecycled + bottles,
      wasteDivertedKg: user.wasteDivertedKg + weight,
      points: user.points + points
    };
    handleUpdateUser(updatedUser);
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans antialiased bg-slate-50 dark:bg-[#0B1120] selection:bg-releaf-200 dark:selection:bg-releaf-900">
        
        <Navbar 
          darkMode={darkMode} 
          toggleTheme={toggleTheme} 
          user={user} 
          onLogout={handleLogout}
          onOpenAuth={() => setIsAuthOpen(true)}
          onToggleChat={toggleChat}
        />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <Hero 
                user={user} 
                onOpenAuth={() => setIsAuthOpen(true)} 
                onRecycle={handleRecycle}
              />
            } />
            
            <Route 
              path="/recycle" 
              element={
                <ProtectedRoute user={user} onOpenAuth={() => setIsAuthOpen(true)}>
                  <Recycle user={user!} onUpdateUser={handleUpdateUser} />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/redeem" 
              element={
                <ProtectedRoute user={user} onOpenAuth={() => setIsAuthOpen(true)}>
                  <Redeem user={user!} onUpdateUser={handleUpdateUser} />
                </ProtectedRoute>
              } 
            />

            <Route path="/articles" element={<Articles />} />
            
            <Route 
              path="/games" 
              element={
                <ProtectedRoute user={user} onOpenAuth={() => setIsAuthOpen(true)}>
                  <Games user={user!} onUpdateUser={handleUpdateUser} />
                </ProtectedRoute>
              } 
            />
            
            <Route path="/leaderboard" element={<Leaderboard currentUser={user} />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="bg-white dark:bg-[#111827] border-t border-slate-200 dark:border-slate-800 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 dark:text-slate-400 text-sm">
            <p className="mb-4 flex items-center justify-center gap-2">
              Made with <span className="text-red-500">♥</span> for the Planet
            </p>
            <p>&copy; {new Date().getFullYear()} Releaf. All rights reserved.</p>
          </div>
        </footer>

        <ChatBot isOpenExternal={isChatOpen} onToggleExternal={setIsChatOpen} />
        
        <Auth 
          isOpen={isAuthOpen} 
          onClose={() => setIsAuthOpen(false)} 
          onLogin={handleLogin} 
        />
        
      </div>
    </HashRouter>
  );
};

export default App;