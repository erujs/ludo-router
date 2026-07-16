import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { Search, House } from "lucide-react";
import type { BottomNavigationProps } from "~/lib/data-types";

export function BottomNavigation({
  search,
  setSearch,
  showSearch,
  setShowSearch,
}: BottomNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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
    <div 
      className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-0" 
      ref={containerRef}
    >
      {!isHomePage && (
        <div className="backdrop-blur-md bg-teal-100/10">
          <Link
            to="/"
            className="flex items-center justify-center w-12 h-12 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-100"
            title="Go Home"
            aria-label="Go Home"
          >
            <House />
          </Link>
        </div>
      )}

      <div 
        className={`backdrop-blur-md bg-teal-100/10 transition-all duration-300 flex items-center flex-row-reverse `}
      >
        <button
          type="button"
          onClick={() => setShowSearch((prev) => !prev)}
          className={`flex items-center justify-center w-12 h-12 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-100 cursor-pointer`}
          title="Search Games"
          aria-label="Search Games"
        >
          <Search />
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out flex items-center ${
            showSearch ? "w-48 pl-3 opacity-100" : "w-0 opacity-0"
          }`}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search games..."
            autoFocus
            className="w-full bg-transparent border-none outline-none text-sm py-1"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
}