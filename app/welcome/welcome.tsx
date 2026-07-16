import { useState } from "react";
import { useAPI } from "~/hooks/use-api";
import { BottomNavigation } from "~/components/bottom-navigation";
import { HeaderShowcase } from "~/components/header-showcase";
import { GameSection, GameSectionSkeleton } from "~/components/game-section";
import { Error } from "~/components/error";
import type { Games } from "~/lib/data-types";

export function Welcome() {
	const [search, setSearch] = useState("");
	const [showSearch, setShowSearch] = useState(false);
	const { data: games, error, loading } = useAPI<Games[]>(`/api/games`);

	const renderContent = () => {
		if (error) {
			return <Error />;
		}

		return (
			<div className="container mx-auto my-5 px-5 flex flex-col gap-5">
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
				) : (
					games?.map((group) => (
						<GameSection key={group.id} group={group} search={search} isHome />
					))
				)}
			</div>
		);
	};

	return (
		<>
			<HeaderShowcase />
			{renderContent()}
		</>
	);
}
