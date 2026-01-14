
import React, { useState } from 'react';
import { ChevronLeft, Coins } from 'lucide-react';

interface CoinTossProps {
  balance: number;
  updateBalance: (amount: number) => void;
  onBack: () => void;
}

export const CoinToss: React.FC<CoinTossProps> = ({ balance, updateBalance, onBack }) => {
  const [betAmount, setBetAmount] = useState<number>(10);
  const [selection, setSelection] = useState<'HEAD' | 'TAIL'>('HEAD');
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<'HEAD' | 'TAIL' | null>(null);

  const handleToss = () => {
    if (betAmount > balance) {
      alert("Insufficient balance!");
      return;
    }

    setIsFlipping(true);
    setResult(null);

    // Vanish animation delay simulation
    setTimeout(() => {
      const outcome = Math.random() > 0.5 ? 'HEAD' : 'TAIL';
      setResult(outcome);
      setIsFlipping(false);
      
      if (outcome === selection) {
        updateBalance(betAmount);
      } else {
        updateBalance(-betAmount);
      }
    }, 2000);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <button onClick={onBack} className="flex items-center gap-1 text-slate-400 mb-6 hover:text-white transition-colors">
        <ChevronLeft size={20} />
        <span>Back to Home</span>
      </button>

      <div className="flex-1 flex flex-col items-center justify-center">
        {!isFlipping && !result && (
          <div className="w-full text-center">
             <div className="w-32 h-32 bg-yellow-500 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl border-4 border-yellow-600">
                <Coins size={60} className="text-yellow-900" />
             </div>
             <h2 className="text-3xl font-bold mb-8">Coin Toss</h2>
             
             <div className="flex gap-4 mb-8">
               <button 
                onClick={() => setSelection('HEAD')}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${selection === 'HEAD' ? 'bg-yellow-500 text-yellow-950 scale-105 shadow-lg' : 'bg-slate-800 text-slate-400'}`}
               >
                 HEADS
               </button>
               <button 
                onClick={() => setSelection('TAIL')}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${selection === 'TAIL' ? 'bg-yellow-500 text-yellow-950 scale-105 shadow-lg' : 'bg-slate-800 text-slate-400'}`}
               >
                 TAILS
               </button>
             </div>

             <div className="mb-8">
               <label className="block text-slate-400 text-sm mb-2">Bet Amount</label>
               <div className="flex items-center gap-2">
                 <button onClick={() => setBetAmount(Math.max(10, betAmount - 10))} className="p-2 bg-slate-800 rounded-lg">-</button>
                 <input 
                  type="number" 
                  value={betAmount} 
                  onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 0))}
                  className="flex-1 bg-slate-800 text-center py-2 rounded-lg font-mono font-bold outline-none border border-slate-700"
                 />
                 <button onClick={() => setBetAmount(betAmount + 10)} className="p-2 bg-slate-800 rounded-lg">+</button>
               </div>
             </div>

             <button 
              onClick={handleToss}
              className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-95"
             >
               FLIP COIN
             </button>
          </div>
        )}

        {isFlipping && (
          <div className="text-center">
            <div className="w-32 h-32 bg-yellow-500 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl animate-spin border-4 border-yellow-400/50">
              <Coins size={60} className="text-yellow-900" />
            </div>
            <p className="text-xl font-bold animate-pulse">Flipping...</p>
          </div>
        )}

        {result && (
          <div className="text-center animate-[scale_0.5s_ease-out]">
            <div className={`w-40 h-40 rounded-full mx-auto mb-8 flex flex-col items-center justify-center shadow-2xl border-4 ${result === selection ? 'bg-green-500 border-green-600' : 'bg-red-500 border-red-600'}`}>
              <span className="text-4xl font-black text-white">{result}</span>
            </div>
            
            <h3 className={`text-3xl font-bold mb-2 ${result === selection ? 'text-green-400' : 'text-red-400'}`}>
              {result === selection ? 'YOU WON!' : 'YOU LOST!'}
            </h3>
            <p className="text-xl font-mono mb-8">
              {result === selection ? `+৳${betAmount}` : `-৳${betAmount}`}
            </p>

            <button 
              onClick={() => setResult(null)}
              className="bg-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
