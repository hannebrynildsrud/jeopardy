export interface Game {
  gameId: string;
  gameState: GameState;
  categories: Category[];
  teams: Team[];
}

export enum GameState {
  TEAM_REGISTRATION = "TEAM_REGISTRATION",
  ROUND_SETUP = "ROUND_SETUP",
  ROUND_ACTIVE = "ROUND_ACTIVE",
  ROUND_FINISHED = "ROUND_FINISHED",
  GAME_FINISHED = "GAME_FINISHED",
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
  winner: Team | null;
}

export interface Answer {
  teamName: string;
  answer: string;
}
