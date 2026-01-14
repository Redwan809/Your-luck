
import React, { useState } from 'react';

interface BankProps {
  balance: number;
  updateBalance: (amount: number) => void;
}

export const Bank: React.FC<BankProps> = ({ balance, updateBalance }) => {
  const [showRefillMsg, setShowRefillMsg] = useState(false);

  const handleRefill = () => {
    if (balance < 100) {
      updateBalance(1000);
      setShowRefillMsg(true);
      setTimeout(() => setShowRefillMsg(false), 3000);
    } else {
      alert("You still have enough balance! Come back when you are broke.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Virtual Bank</h2>
      
      <div className="bg-slate-800 rounded-3xl p-8 mb-6 border border-slate-700 shadow-xl text-center">
        <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Total Virtual Balance</p>
        <div className="flex items-center justify-center gap-3 text-4xl font-bold text-blue-400">
          <span className="text-yellow-500">৳</span>
          <span>{balance.toLocaleString()}</span>
        </div>
      </div>

      <div className="space-y-4">
        <button 
          onClick={handleRefill}
          className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50"
        >
          Daily Free Refill (৳1000)
        </button>
        
        {showRefillMsg && (
          <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-center animate-bounce">
            Success! +৳1000 added to your account.
          </div>
        )}

        <div className="bg-slate-800/50 p-6 rounded-2xl border border-dashed border-slate-700 text-center">
          <p className="text-slate-500 text-sm italic">
            This is a fun currency with no real value. You can refill it whenever it goes below 100.
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-slate-700 pt-6">
        <h3 className="font-bold text-lg mb-4">Transaction History</h3>
        <div className="flex flex-col items-center justify-center py-10 text-slate-600 italic">
          <p>No transactions yet...</p>
        </div>
      </div>
    </div>
  );
};
