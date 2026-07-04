export type GameStatus = "Completed" | "Played" | "Playing" | "Backlog" | "Wishlist";
export type CompletionType = "Story" | "Full" | "Endless";

export interface Game {
  id: string;
  title: string;
  status: GameStatus;
  completion?: CompletionType;
  image: string;
  link: string;
}

export interface Games {
  id: string;
  platform: string;
  games: Game[];
}

export interface GameSectionProps {
  group: Games;
  API_URL: string;
  search: string;
  isHome?: boolean;
}
