import { challengeRegistry } from '@/challenges/index.js';
import { Filter, Search } from 'lucide-react';
import { useState } from 'react';
import { ChallengeItem } from './challenge-item.js';

export function ChallengeSelect() {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');

  const filtered = challengeRegistry.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                         c.category.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === 'all' || c.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text"
            placeholder="Search challenges or categories..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:border-blue-500 outline-none transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-500" />
          <select 
            className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:border-blue-500 outline-none transition-colors appearance-none cursor-pointer"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(challenge => (
          <ChallengeItem 
            key={challenge.id} 
            challenge={challenge} 
            progress={0} // We'll hook this up to Redux/LocalStorage later
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
          <p className="text-slate-500">No challenges found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
