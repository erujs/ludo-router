import { HeartCrack, RotateCcw } from "lucide-react";

export function Error() {
	return (
		<div className="flex items-center justify-center min-h-[60vh] px-5 py-10">
			<div className="relative overflow-hidden border border-red-100 backdrop-blur-sm aspect-[2/3] w-full max-w-xs p-6 flex flex-col justify-between items-center text-center text-red-100">
				<div className="flex flex-col items-center gap-3 mt-6">
					<span className="text-xs uppercase tracking-widest text-red-400/80 font-bold">
						System Error
					</span>
					<div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-red-950/40 border border-red-500/20 text-red-400">
						<HeartCrack className="w-7 h-7 animate-pulse" />
					</div>
				</div>

				<div className="flex flex-col gap-2 px-2">
					<h1 className="text-xl font-bold tracking-wide">
						Something went wrong
					</h1>
					<p className="text-xs leading-relaxed">
						We couldn't retrieve the games. Please try again later.
					</p>
				</div>

				<button
					onClick={() => window.location.reload()}
					className="w-full mb-4 inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider
              bg-white hover:bg-teal-100 text-gray-950 transition-all duration-200 
              hover:shadow-[0_0_15px_rgba(20,184,166,0.25)] active:scale-95 cursor-pointer"
				>
					<RotateCcw className="w-3.5 h-3.5" />
					<span>Reload</span>
				</button>
			</div>
		</div>
	)
}