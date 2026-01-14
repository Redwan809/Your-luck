
export type Page = 'HOME' | 'BANK' | 'GAME';

export interface Route {
  page: Page;
  gameId?: string | null;
}

export interface Game {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface AppState {
  balance: number;
  route: Route;
}
