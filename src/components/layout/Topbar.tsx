import { Bell, Search, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Topbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/chart/${searchQuery.trim().toUpperCase()}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#0A0A0A] px-6">
      <div className="flex flex-1 items-center">
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
          </div>
          <input
            id="search-field"
            className="block h-9 w-full rounded-md border-0 bg-white/5 py-1.5 pl-10 pr-3 text-sm text-white placeholder-gray-400 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="Search symbols (e.g., AAPL, EURUSD, BTCUSDT)..."
            type="search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
          <span className="sr-only">View notifications</span>
          <Bell className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-white/10" aria-hidden="true" />
        <div className="flex items-center gap-x-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="hidden text-sm font-semibold leading-6 text-white lg:flex lg:items-center">
            John Doe
          </span>
        </div>
      </div>
    </header>
  );
}
