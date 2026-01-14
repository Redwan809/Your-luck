
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Bank } from './pages/Bank';
import { CoinToss } from './games/CoinToss';
import { DiceRoll } from './games/DiceRoll';
import { LuckySpin } from './games/LuckySpin';
import { CardHigherLower } from './games/CardHigherLower';
import { NumberGuess } from './games/NumberGuess';
import { Page, Route } from './types';

const INITIAL_BALANCE = 1000;

interface NavigationContextType {
  route: Route;
  navigate: (page: Page, gameId?: string | null) => void;
  goBack: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within a NavigationProvider');
  return context;
};

const App: React.FC = () => {
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('funbet_balance');
    return saved ? parseInt(saved, 10) : INITIAL_BALANCE;
  });
  
  const [route, setRoute] = useState<Route>({ page: 'HOME', gameId: null });

  useEffect(() => {
    localStorage.setItem('funbet_balance', balance.toString());
  }, [balance]);

  const updateBalance = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  const navigate = (page: Page, gameId: string | null = null) => {
    setRoute({ page, gameId });
  };

  const goBack = () => {
    setRoute({ page: 'HOME', gameId: null });
  };

  const renderContent = () => {
    if (route.page === 'BANK') {
      return <Bank balance={balance} updateBalance={updateBalance} />;
    }

    if (route.page === 'GAME') {
      switch (route.gameId) {
        case 'coin-toss':
          return <CoinToss balance={balance} updateBalance={updateBalance} onBack={goBack} />;
        case 'dice-roll':
          return <DiceRoll balance={balance} updateBalance={updateBalance} onBack={goBack} />;
        case 'lucky-spin':
          return <LuckySpin balance={balance} updateBalance={updateBalance} onBack={goBack} />;
        case 'card-higher-lower':
          return <CardHigherLower balance={balance} updateBalance={updateBalance} onBack={goBack} />;
        case 'number-guess':
          return <NumberGuess balance={balance} updateBalance={updateBalance} onBack={goBack} />;
        default:
          return <Home onSelectGame={(id) => navigate('GAME', id)} />;
      }
    }

    return <Home onSelectGame={(id) => navigate('GAME', id)} />;
  };

  return (
    <NavigationContext.Provider value={{ route, navigate, goBack }}>
      <Layout balance={balance}>
        {renderContent()}
      </Layout>
    </NavigationContext.Provider>
  );
};

export default App;
