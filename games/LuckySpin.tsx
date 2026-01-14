
import React, { useState } from 'react';
import { ChevronLeft, RotateCw } from 'lucide-react';

interface LuckySpinProps {
  balance: number;
  updateBalance: (amount: number) => void;
  onBack: () => void;
}

const MULTIPLIERS = [0, 0.5, 1, 1.5, 2, 5, 0.1, 10];

export const LuckySpin: React.FC<LuckySpinProps> = ({ balance, updateBalance, onBack }) => {
  const [betAmount, setBetAmount] = useState<number>(10);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  const handleSpin = () => {
    if (betAmount > balance) {
      alert("Insufficient balance!");
      return;
    }

    setIsSpinning(true);
    setResult(null);
    
    const randomExtra = Math.floor(Math.random() * 360);
    const totalRotation = rotation + (360 * 5) + randomExtra;
    setRotation(totalRotation);

    setTimeout(() => {
      const normalized = (totalRotation % 360);
      const segmentIndex = Math.floor(normalized / (360 / MULTIPLIERS.length));
      const mult = MULTIPLIERS[segmentIndex];
      
      setResult(mult);
      setIsSpinning(false);
      
      const winAmount = Math.floor(betAmount * mult);
      updateBalance(winAmount - betAmount);
    }, 3000);
  };

  return (
    <div className="p-6 h-full flex flex-col overflow-hidden">
      <button onClick={onBack} className="flex items-center gap-1 text-slate-400 mb-6 hover:text-white transition-colors">
        <ChevronLeft size={20} />
        <span>Back to Home</span>
      </button>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative mb-12">
            {/* Pointer */}
            <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 z-10 w-6 h-10 bg-red-500 rounded-b-full shadow-lg border-2 border-white"></div>
            
            <div 
              style={{ transform: `rotate(${rotation}deg)`, transition: isSpinning ? 'transform 3s cubic-bezier(0.1, 0.7, 0.1, 1)' : 'none' }}
              className="w-64 h-64 rounded-full border-8 border-slate-700 relative overflow-hidden shadow-2xl bg-slate-800"
            >
              {MULTIPLIERS.map((m, i) => (
                <div 
                  key={i} 
                  className="absolute w-full h-full flex items-center justify-center"
                  style={{ transform: `rotate(${(360 / MULTIPLIERS.length) * i}deg)` }}
                >
                  <div className={`h-full w-px bg-slate-600 absolute left-1/2`}></div>
                  <span className="absolute top-4 font-bold text-xs" style={{ transform: `rotate(-${(360 / MULTIPLIERS.length) * i}deg)` }}>
                    {m}x
                  </span>
                </div>
              ))}
            </div>
        </div>

        {!isSpinning && !result && (
          <div className="w-full text-center">
             <h2 className="text-3xl font-bold mb-4">Lucky Spin</h2>
             
             <div className="mb-8">
               <label className="block text-slate-400 text-sm mb-2">Bet Amount</label>
               <div className="flex items-center gap-2">
                 <button onClick={() => setBetAmount(Math.max(10, betAmount - 10))} className="p-2 bg-slate-800 rounded-lg">-</button>
                 <input 
                  type="number" 
                  value={betAmount} 
                  onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 0))}
                  className="flex-1 bg-slate-800 text-center py-2 rounded-lg font-mono font-bold outline-none"
                 />
                 <button onClick={() => setBetAmount(betAmount + 10)} className="p-2 bg-slate-800 rounded-lg">+</button>
               </div>
             </div>

             <button 
              onClick={handleSpin}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-95"
             >
               SPIN NOW
             </button>
          </div>
        )}

        {isSpinning && (
          <p className="text-xl font-bold animate-pulse text-purple-400">Good luck! Spinning...</p>
        )}

        {result !== null && (
          <div className="text-center">
            <h3 className={`text-4xl font-black mb-2 ${result >= 1 ? 'text-green-400' : 'text-red-400'}`}>
               {result}x Multiplier!
            </h3>
            <p className="text-2xl font-mono mb-8">
              {result >= 1 ? `Profit: +৳${Math.floor(betAmount * (result - 1))}` : `Loss: -৳${Math.floor(betAmount * (1 - result))}`}
            </p>

            <button 
              onClick={() => setResult(null)}
              className="bg-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-600 transition-colors"
            >
              Spin Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
