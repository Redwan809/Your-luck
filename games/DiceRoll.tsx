
import React, { useState } from 'react';
import { ChevronLeft, Dice5 } from 'lucide-react';

interface DiceRollProps {
  balance: number;
  updateBalance: (amount: number) => void;
  onBack: () => void;
}

export const DiceRoll: React.FC<DiceRollProps> = ({ balance, updateBalance, onBack }) => {
  const [betAmount, setBetAmount] = useState<number>(10);
  const [selection, setSelection] = useState<number>(6);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const handleRoll = () => {
    if (betAmount > balance) {
      alert("Insufficient balance!");
      return;
    }

    setIsRolling(true);
    setResult(null);

    setTimeout(() => {
      const outcome = Math.floor(Math.random() * 6) + 1;
      setResult(outcome);
      setIsRolling(false);
      
      if (outcome === selection) {
        updateBalance(betAmount * 5); // 5x payout for exact match
      } else {
        updateBalance(-betAmount);
      }
    }, 1500);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <button onClick={onBack} className="flex items-center gap-1 text-slate-400 mb-6 hover:text-white transition-colors">
        <ChevronLeft size={20} />
        <span>Back to Home</span>
      </button>

      <div className="flex-1 flex flex-col items-center justify-center">
        {!isRolling && !result && (
          <div className="w-full text-center">
             <div className="w-32 h-32 bg-blue-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl rotate-12">
                <Dice5 size={60} className="text-white" />
             </div>
             <h2 className="text-3xl font-bold mb-4">Dice Roll</h2>
             <p className="text-slate-400 mb-8 text-sm">Win 5x if you guess correctly!</p>
             
             <div className="grid grid-cols-6 gap-2 mb-8">
               {[1, 2, 3, 4, 5, 6].map(num => (
                 <button 
                  key={num}
                  onClick={() => setSelection(num)}
                  className={`py-3 rounded-lg font-bold transition-all ${selection === num ? 'bg-blue-500 text-white scale-110 shadow-lg' : 'bg-slate-800 text-slate-400'}`}
                 >
                   {num}
                 </button>
               ))}
             </div>

             <div className="mb-8">
               <label className="block text-slate-400 text-sm mb-2 text-left">Bet Amount</label>
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
              onClick={handleRoll}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-95"
             >
               ROLL DICE
             </button>
          </div>
        )}

        {isRolling && (
          <div className="text-center">
            <div className="w-32 h-32 bg-blue-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl animate-bounce">
              <Dice5 size={60} className="text-white" />
            </div>
            <p className="text-xl font-bold animate-pulse">Rolling...</p>
          </div>
        )}

        {result !== null && (
          <div className="text-center">
            <div className={`w-32 h-32 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl border-4 ${result === selection ? 'bg-green-500 border-green-600' : 'bg-red-500 border-red-600'}`}>
              <span className="text-6xl font-black text-white">{result}</span>
            </div>
            
            <h3 className={`text-3xl font-bold mb-2 ${result === selection ? 'text-green-400' : 'text-red-400'}`}>
              {result === selection ? 'BINGO!' : 'MISSED!'}
            </h3>
            <p className="text-xl font-mono mb-8">
              {result === selection ? `+৳${betAmount * 5}` : `-৳${betAmount}`}
            </p>

            <button 
              onClick={() => setResult(null)}
              className="bg-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-600 transition-colors"
            >
              Roll Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
