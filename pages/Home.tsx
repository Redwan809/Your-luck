
import React from 'react';
import { Game } from '../types';
import { Coins, Dice5, RotateCw, Layers, Hash } from 'lucide-react';

const GAMES: Game[] = [
  {
    id: 'coin-toss',
    name: 'Coin Toss',
    icon: 'Coins',
    description: 'Heads or Tails?',
    color: 'bg-gradient-to-br from-yellow-500 to-yellow-700'
  },
  {
    id: 'dice-roll',
    name: 'Dice Roll',
    icon: 'Dice5',
    description: 'Roll for the high!',
    color: 'bg-gradient-to-br from-blue-500 to-blue-700'
  },
  {
    id: 'lucky-spin',
    name: 'Lucky Spin',
    icon: 'RotateCw',
    description: 'Spin to win big!',
    color: 'bg-gradient-to-br from-purple-500 to-purple-700'
  },
  {
    id: 'card-higher-lower',
    name: 'Card High-Low',
    icon: 'Layers',
    description: 'Guess the next card',
    color: 'bg-gradient-to-br from-red-500 to-red-700'
  },
  {
    id: 'number-guess',
    name: 'Number Guess',
    icon: 'Hash',
    description: '1 to 10. Can you guess?',
    color: 'bg-gradient-to-br from-green-500 to-green-700'
  }
];

interface HomeProps {
  onSelectGame: (id: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectGame }) => {
  return (
    <div className="p-4 sm:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold mb-1 tracking-tight">Popular Games</h2>
        <p className="text-slate-400 text-sm">Pick a game and win virtual coins.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {GAMES.map((game) => (
          <button
            key={game.id}
            onClick={() => onSelectGame(game.id)}
            className={`${game.color} rounded-2xl p-4 flex flex-col items-start text-left h-44 relative overflow-hidden transition-all active:scale-95 shadow-lg group`}
          >
            <div className="bg-white/20 p-2 rounded-xl mb-3 backdrop-blur-sm shadow-inner">
              {game.id === 'coin-toss' && <Coins size={22} />}
              {game.id === 'dice-roll' && <Dice5 size={22} />}
              {game.id === 'lucky-spin' && <RotateCw size={22} />}
              {game.id === 'card-higher-lower' && <Layers size={22} />}
              {game.id === 'number-guess' && <Hash size={22} />}
            </div>
            <h3 className="font-bold text-base leading-tight uppercase tracking-wide">{game.name}</h3>
            <p className="text-[10px] text-white/80 mt-1 font-medium">{game.description}</p>
            
            <div className="absolute -bottom-2 -right-2 opacity-20 transform rotate-12 group-hover:scale-110 transition-transform">
               {game.id === 'coin-toss' && <Coins size={70} />}
               {game.id === 'dice-roll' && <Dice5 size={70} />}
               {game.id === 'lucky-spin' && <RotateCw size={70} />}
               {game.id === 'card-higher-lower' && <Layers size={70} />}
               {game.id === 'number-guess' && <Hash size={70} />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
