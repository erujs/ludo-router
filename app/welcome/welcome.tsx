import { useState } from "react";
import { useAPI } from "~/hooks/use-api";
import SearchBar from "~/components/search-bar";
import HeaderShowcase from "~/components/header-showcase";
import { GameSection } from "~/components/game-section";
import type { Games } from "~/lib/data-types";

export function Welcome() {
	const [search, setSearch] = useState("");
	const [showSearch, setShowSearch] = useState(false);
	const API_URL = import.meta.env.VITE_GULA_DATA_URL || "http://localhost:3000";
	const { data: games, error, loading } = useAPI<Games[]>(`${API_URL}/api/games`);

	// if (error) throw new Error(error)

	return (
		<>
			<HeaderShowcase />

			<div className="container mx-auto p-6">
				{loading && (
					<div className="fixed top-0 left-0 w-full h-1 z-50">
						<div className="h-1 w-full bg-cyan-400 animate-pulse" />
					</div>
				)}

				{games?.map((group) => (
					<GameSection
						key={group.id}
						group={group}
						API_URL={API_URL}
						search={search}
						isHome />
				))}

				<SearchBar
					search={search}
					setSearch={setSearch}
					showSearch={showSearch}
					setShowSearch={setShowSearch} />
			</div>
		</>
	);
}
