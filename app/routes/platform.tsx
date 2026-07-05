import { useState } from "react";
import { Link, useParams } from "react-router";
import { useAPI } from "~/hooks/use-api";
import { GameSection } from "~/components/game-section";
import SearchBar from "~/components/search-bar";
import { House } from "lucide-react";
import type { Games } from "~/lib/data-types";
import type { Route } from "./+types/platform";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Ludo Router" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Platform() {
  const { id } = useParams<{ id: string }>()
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const API_ENDPOINT = import.meta.env.VITE_GULA_DATA_URL || "http://localhost:3000";
  const { data: game, error, loading } = useAPI<Games | Games[] | null>(`${API_ENDPOINT}/api/games/${id}`);

  if (error) throw new Error(error)

  return (
    <div className="container mx-auto p-8">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-1 z-50">
          <div className="h-1 w-full bg-cyan-400 animate-pulse" />
        </div>
      )}

      {Array.isArray(game) ? (
        game.map((group) => (
          <GameSection
            key={group.id}
            group={group}
            API_ENDPOINT={API_ENDPOINT}
            search={search}
          />
        ))
      ) : (
        game && (
          <GameSection
            key={game.id}
            group={game}
            API_ENDPOINT={API_ENDPOINT}
            search={search}
          />
        )
      )}

      <div className="fixed bottom-20 right-6 color-white">
        <Link
          to="/"
          className="flex items-center h-12 bg-white shadow-lg rounded-full border border-gray-300 transition-all duration-300 overflow-hidden cursor-pointer w-12 px-0 justify-center"
        >
          <House size={20} className="text-black" />
        </Link>
      </div>

      <SearchBar
        search={search}
        setSearch={setSearch}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
      />
    </div>
  );
}
