
import React from 'react';
import { Home as HomeIcon, Wallet } from 'lucide-react';
import { useNavigation } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  balance: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, balance }) => {
  const { route, navigate } = useNavigation();

  return (
    <div className="h-full flex flex-col max-w-md mx-auto bg-slate-900 relative shadow-2xl">
      {/* Top Header */}
      <header className="flex-none bg-slate-800/80 backdrop-blur-md pt-[calc(env(safe-area-inset-top)+1rem)] pb-4 px-4 flex justify-between items-center border-b border-slate-700 z-50">
        <div className="flex items-center gap-2">
           <h1 className="font-bold text-xl text-blue-400 tracking-tight">FunBet</h1>
        </div>
        
        <div className="bg-slate-950 px-3 py-1.5 rounded-full border border-blue-500/30 flex items-center gap-2 shadow-inner">
          <span className="text-yellow-500 font-bold">৳</span>
          <span className="font-mono font-bold text-white tabular-nums">
            {balance.toLocaleString()}
          </span>
        </div>
      </header>

      {/* Main Content Area - Scrollable */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative pb-[calc(env(safe-area-inset-bottom)+5rem)]">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="flex-none fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-slate-800/95 backdrop-blur-lg border-t border-slate-700 px-8 pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] flex justify-around items-center shadow-[0_-4px_15px_rgba(0,0,0,0.4)] z-50">
        <button 
          onClick={() => navigate('HOME')}
          className={`flex flex-col items-center gap-1 transition-all flex-1 py-1 ${route.page === 'HOME' || (route.page === 'GAME' && !route.gameId) ? 'text-blue-400 scale-105' : 'text-slate-400'}`}
        >
          <HomeIcon size={22} strokeWidth={route.page === 'HOME' ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </button>
        
        <button 
          onClick={() => navigate('BANK')}
          className={`flex flex-col items-center gap-1 transition-all flex-1 py-1 ${route.page === 'BANK' ? 'text-blue-400 scale-105' : 'text-slate-400'}`}
        >
          <Wallet size={22} strokeWidth={route.page === 'BANK' ? 2.5 : 2} />
          <span className="text-[10px] font-bold uppercase tracking-wider">Bank</span>
        </button>
      </nav>
    </div>
  );
};
