
import React, { useState } from 'react';
import { ChevronLeft, Hash } from 'lucide-react';

interface NumberGuessProps {
  balance: number;
  updateBalance: (amount: number) => void;
  onBack: () => void;
}

export const NumberGuess: React.FC<NumberGuessProps> = ({ balance, updateBalance, onBack }) => {
  const [betAmount, setBetAmount] = useState<number>(10);
  const [selection, setSelection] = useState<number>(5);
  const [isThinking, setIsThinking] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const handleGuess = () => {
    if (betAmount > balance) {
      alert("Insufficient balance!");
      return;
    }

    setIsThinking(true);
    setResult(null);

    setTimeout(() => {
      const outcome = Math.floor(Math.random() * 10) + 1;
      setResult(outcome);
      setIsThinking(false);
      
      if (outcome === selection) {
        updateBalance(betAmount * 9); // 9x payout for 1/10 chance
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
        {!isThinking && !result && (
          <div className="w-full text-center">
             <div className="w-32 h-32 bg-green-600 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl border-4 border-green-500">
                <Hash size={60} className="text-white" />
             </div>
             <h2 className="text-3xl font-bold mb-2">Guess 1-10</h2>
             <p className="text-green-400 font-bold mb-8">Win 9x your bet!</p>
             
             <div className="grid grid-cols-5 gap-2 mb-8">
               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                 <button 
                  key={num}
                  onClick={() => setSelection(num)}
                  className={`py-3 rounded-lg font-bold transition-all ${selection === num ? 'bg-green-500 text-white scale-110 shadow-lg' : 'bg-slate-800 text-slate-400'}`}
                 >
                   {num}
                 </button>
               ))}
             </div>

             <div className="mb-8">
               <label className="block text-slate-400 text-sm mb-2 text-left">Bet Amount</label>
               <input 
                  type="number" 
                  value={betAmount} 
                  onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-800 text-center py-2 rounded-lg font-mono font-bold outline-none border border-slate-700"
               />
             </div>

             <button 
              onClick={handleGuess}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-95"
             >
               GUESS NUMBER
             </button>
          </div>
        )}

        {isThinking && (
          <div className="text-center">
             <div className="w-32 h-32 bg-green-600 rounded-full mx-auto mb-8 flex items-center justify-center animate-ping">
                <Hash size={60} className="text-white" />
             </div>
             <p className="text-xl font-bold">Choosing a number...</p>
          </div>
        )}

        {result !== null && (
          <div className="text-center">
            <div className={`w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl border-4 ${result === selection ? 'bg-green-500 border-green-600' : 'bg-red-500 border-red-600'}`}>
              <span className="text-5xl font-black text-white">{result}</span>
            </div>
            
            <h3 className={`text-3xl font-bold mb-2 ${result === selection ? 'text-green-400' : 'text-red-400'}`}>
              {result === selection ? 'PERFECT!' : 'NOPE!'}
            </h3>
            <p className="text-xl font-mono mb-8">
              {result === selection ? `+৳${betAmount * 9}` : `-৳${betAmount}`}
            </p>

            <button 
              onClick={() => setResult(null)}
              className="bg-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
