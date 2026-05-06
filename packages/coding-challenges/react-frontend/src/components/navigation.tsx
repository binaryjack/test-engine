import { Code2, Layout, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:text-blue-400 transition-colors">
          <Layout className="w-6 h-6 text-blue-500" />
          <span>Test Engine</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">
            <Code2 className="w-4 h-4" />
            <span>Challenges</span>
          </Link>
          <Link to="/leaderboard" className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors">
            <Trophy className="w-4 h-4" />
            <span>Leaderboard</span>
          </Link>
          <div className="h-6 w-px bg-slate-800" />
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">
               JD
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
