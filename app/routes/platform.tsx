import { useState } from "react";
import { useParams } from "react-router";
import { useAPI } from "~/hooks/use-api";
import { GameSection, GameSectionSkeleton } from "~/components/game-section";
import { BottomNavigation } from "~/components/bottom-navigation";
import { Error } from "~/components/error";
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
  const { data: game, error, loading } = useAPI<Games | Games[] | null>(`/api/games/${id}`);

  const renderContent = () => {
    if (error) {
      return <Error />;
    }

    return (
      <div className="container mx-auto p-8 flex flex-col gap-5">
        {!loading && (
          <BottomNavigation
            search={search}
            setSearch={setSearch}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
          />
        )}

        {loading ? (
          <GameSectionSkeleton />
        ) : (() => {
            if (Array.isArray(game)) {
              return game.map((group) => (
                <GameSection key={group.id} group={group} search={search} />
              ));
            }

            if (game) {
              return <GameSection key={game.id} group={game} search={search} />;
            }

            return null;
          })()
        }
      </div>
    );
  };

  return renderContent()
}

