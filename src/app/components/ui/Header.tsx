import { Home, Settings, Volume2 } from "lucide-react";

function Header() {
  return (
    <header className="bg-indigo-500 text-white p-4 flex justify-between items-center rounded-b-xl shadow-lg">
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-indigo-600 rounded-full transition-colors">
          <Home size={24} />
        </button>
        <h1 className="text-2xl font-bold">Number Quest</h1>
      </div>
      <div className="flex gap-3">
        <button className="p-2 hover:bg-indigo-600 rounded-full transition-colors">
          <Volume2 size={24} />
        </button>
        <button className="p-2 hover:bg-indigo-600 rounded-full transition-colors">
          <Settings size={24} />
        </button>
      </div>
    </header>
  );
}

export default Header;
