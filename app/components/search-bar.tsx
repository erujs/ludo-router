import { useEffect, useRef } from "react";
import { Search } from "lucide-react";

export default function SearchBar({
	search,
	setSearch,
	showSearch,
	setShowSearch,
}: {
	search: string;
	setSearch: (val: string) => void;
	showSearch: boolean;
	setShowSearch: (val: boolean | ((prev: boolean) => boolean)) => void;
}) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setShowSearch(false);
			}
		}

		if (showSearch) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showSearch, setShowSearch]);

	return (
		<div className="fixed bottom-6 right-6" ref={ref}>
			<div
				className={`flex items-center h-12 bg-white shadow-lg rounded-full border border-gray-300 transition-all duration-300 overflow-hidden cursor-pointer ${showSearch ? "w-64 px-3" : "w-12 px-0 justify-center"
					}`}
				onClick={() => setShowSearch((prev) => !prev)}
			>
				<Search size={20} className="text-black" />

				{showSearch && (
					<input
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search games..."
						autoFocus
						className="flex-1 bg-transparent border-none outline-none ml-2 text-black"
						onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside input
					/>
				)}
			</div>
		</div>
	);
}
