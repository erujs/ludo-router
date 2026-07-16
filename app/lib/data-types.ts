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
  search: string;
  isHome?: boolean;
}

export interface BottomNavigationProps {
  search: string;
  setSearch: (val: string) => void;
  showSearch: boolean;
  setShowSearch: (val: boolean | ((prev: boolean) => boolean)) => void;
}
