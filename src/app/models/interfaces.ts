export interface GameState {
  gameId: string;
  isRegistrationOpen: boolean;
  categories: Category[];
  teams: Team[];
}

export interface Team {
  teamName: string;
  score: number;
}

export interface Category {
  id: number;
  isActive: boolean;
  title: string;
  slots: Slots[];
  activeSlot: number;
}

export interface Slots {
  points: string;
  isActive: boolean;
  winner: string;
}

export interface Answer {
  teamName: string;
  answer: string;
}
