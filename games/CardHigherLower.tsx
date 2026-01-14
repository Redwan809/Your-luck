
import React, { useState } from 'react';
import { ChevronLeft, Layers } from 'lucide-react';

interface CardHigherLowerProps {
  balance: number;
  updateBalance: (amount: number) => void;
  onBack: () => void;
}

export const CardHigherLower: React.FC<CardHigherLowerProps> = ({ balance, updateBalance, onBack }) => {
  const [betAmount, setBetAmount] = useState<number>(10);
  const [selection, setSelection] = useState<'HIGH' | 'LOW'>('HIGH');
  const [isDealing, setIsDealing] = useState(false);
  const [currentCard, setCurrentCard] = useState<number>(Math.floor(Math.random() * 13) + 1);
  const [nextCard, setNextCard] = useState<number | null>(null);

  const handlePlay = () => {
    if (betAmount > balance) {
      alert("Insufficient balance!");
      return;
    }

    setIsDealing(true);
    setNextCard(null);

    setTimeout(() => {
      let outcome = Math.floor(Math.random() * 13) + 1;
      // Ensure it's not the same card for simpler logic
      if (outcome === currentCard) outcome = (outcome % 13) + 1;
      
      setNextCard(outcome);
      setIsDealing(false);
      
      const win = (selection === 'HIGH' && outcome > currentCard) || (selection === 'LOW' && outcome < currentCard);
      
      if (win) {
        updateBalance(betAmount);
      } else {
        updateBalance(-betAmount);
      }
    }, 1500);
  };

  const cardName = (n: number) => {
    if (n === 1) return 'A';
    if (n === 11) return 'J';
    if (n === 12) return 'Q';
    if (n === 13) return 'K';
    return n.toString();
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <button onClick={onBack} className="flex items-center gap-1 text-slate-400 mb-6 hover:text-white transition-colors">
        <ChevronLeft size={20} />
        <span>Back to Home</span>
      </button>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex gap-4 mb-12">
           <div className="w-24 h-36 bg-white rounded-xl shadow-xl flex items-center justify-center border-2 border-slate-200">
             <span className="text-4xl font-bold text-red-600">{cardName(currentCard)}</span>
           </div>
           <div className="w-24 h-36 bg-slate-800 rounded-xl shadow-xl border-2 border-dashed border-slate-600 flex items-center justify-center">
             {isDealing ? <div className="animate-pulse text-slate-500">?</div> : (nextCard ? <span className="text-4xl font-bold text-blue-500">{cardName(nextCard)}</span> : <Layers className="text-slate-600" />)}
           </div>
        </div>

        {!isDealing && !nextCard && (
          <div className="w-full text-center">
             <h2 className="text-2xl font-bold mb-4">Higher or Lower?</h2>
             
             <div className="flex gap-4 mb-8">
               <button 
                onClick={() => setSelection('HIGH')}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${selection === 'HIGH' ? 'bg-red-500 text-white scale-105 shadow-lg' : 'bg-slate-800 text-slate-400'}`}
               >
                 HIGHER
               </button>
               <button 
                onClick={() => setSelection('LOW')}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${selection === 'LOW' ? 'bg-red-500 text-white scale-105 shadow-lg' : 'bg-slate-800 text-slate-400'}`}
               >
                 LOWER
               </button>
             </div>

             <div className="mb-8">
               <label className="block text-slate-400 text-sm mb-2">Bet Amount</label>
               <input 
                  type="number" 
                  value={betAmount} 
                  onChange={(e) => setBetAmount(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-800 text-center py-2 rounded-lg font-mono font-bold"
               />
             </div>

             <button 
              onClick={handlePlay}
              className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-95"
             >
               DEAL CARD
             </button>
          </div>
        )}

        {nextCard && (
          <div className="text-center">
             <h3 className={`text-3xl font-bold mb-4 ${(selection === 'HIGH' && nextCard > currentCard) || (selection === 'LOW' && nextCard < currentCard) ? 'text-green-400' : 'text-red-400'}`}>
               {(selection === 'HIGH' && nextCard > currentCard) || (selection === 'LOW' && nextCard < currentCard) ? 'CORRECT!' : 'WRONG!'}
             </h3>
             <button 
              onClick={() => { setCurrentCard(nextCard); setNextCard(null); }}
              className="bg-slate-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-600"
             >
               Continue
             </button>
          </div>
        )}
      </div>
    </div>
  );
};
