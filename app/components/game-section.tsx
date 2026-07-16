import { Link } from "react-router";
import { Gamepad, Trophy } from "lucide-react";
import type { GameStatus, GameSectionProps } from "~/lib/data-types";

export function GameSectionSkeleton() {
  const skeletonCards = Array.from({ length: 5 });

  return (
    <div className="flex flex-col gap-5 animate-pulse">
      <div className="flex items-center">
        <div className="h-7 w-32 bg-white" />
        <div className="flex-1 h-px bg-white ml-5" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 justify-items-center w-full">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="aspect-[2/3] w-full max-w-xs bg-white shadow-sm"
          />
        ))}
      </div>
    </div>
  );
}

export function GameSection({ group, search, isHome = false }: GameSectionProps) {
  const statusOrder: Record<GameStatus, number> = {
    Completed: 0,
    Played: 1,
    Playing: 2,
    Backlog: 3,
    Wishlist: 4,
  };

  const searchLower = search.trim().toLowerCase();

  const filteredGames = group.games
    .filter((game) => {
      if (!searchLower) return true;
      return (
        game.title.toLowerCase().includes(searchLower) ||
        game.status.toLowerCase().includes(searchLower) ||
        group.platform.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

  if (filteredGames.length === 0) return null;

  return (
    <section key={group.id} className="flex flex-col gap-5">
      <div className="flex items-center">
        {isHome ? (
          <Link
            to={`/${group.platform.toLowerCase()}`}
            className="text-xl font-bold tracking-wide hover:underline hover:text-teal-100 transition-colors"
          >
            {group.platform}
          </Link>
        ) : (
          <h2 className="text-xl font-bold tracking-wide">{group.platform}</h2>
        )}
        <div className="flex-1 h-px bg-gray-300 ml-5" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 justify-items-center">
        {filteredGames.map((game) => (
          <a
            key={game.id}
            href={game.link}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden shadow-lg bg-gray-200 aspect-[2/3] w-full max-w-xs hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={`${game.image}`}
              alt={game.title}
              className="absolute inset-0 w-full h-full object-fill"
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out
                flex flex-col justify-end p-2 text-white"
            >
              <h3 className="text-lg font-bold mb-1">{game.title}</h3>
              <p className="text-xs uppercase tracking-wide text-teal-100 ">
                {group.platform}
              </p>
              <p className="text-sm mt-2 flex gap-1 items-center">
                <Gamepad />
                <span>{game.status}</span>
              </p>
              {game.completion && <p className="text-sm flex gap-1 items-center">
                <Trophy />
                <span>{game.completion}</span>
              </p>}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
