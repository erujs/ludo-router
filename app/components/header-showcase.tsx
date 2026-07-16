import { Gamepad } from "lucide-react";

export function HeaderShowcase() {
	return (
		<div className="relative w-full h-64 md:h-96 overflow-hidden">
			<video
				autoPlay
				loop
				muted
				playsInline
				className="absolute inset-0 w-full h-full object-cover"
			>
				<source src="/2b.mp4" type="video/mp4" />
			</video>
			<div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-center">
				{/* Header */}
				<div className="flex flex-wrap items-center justify-center gap-2 text-center">
					<Gamepad className="h-12 w-12 text-white" />
					<h1 className="text-4xl font-bold font-sans">
						Ludo Router
					</h1>
				</div>
				<p className="m-2 text-md">
					&apos;Ludo&apos; means &quot;I play&quot; in Latin, and this personal backlog is built with React Router<br />
					<span className="italic font-medium">
						Essentially: The path to what I play.
					</span>
				</p>
			</div>
			<div className="absolute bottom-2 right-2 text-xs text-white/90">
				Character is 2b from Nier Automata
			</div>
		</div>
	);
}
