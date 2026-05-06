import { Sparkles, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { resetAllChallenges } from '../challenge-view/store/challenge.slice.js';
import { ChallengeSelect } from './components/challenge-select.js';

export default function DashboardPage() {
  const dispatch = useDispatch();

  const handleResetAll = () => {
    if (window.confirm("WARNING: This will wipe ALL your challenge progress across all levels. This action is irreversible. Continue?")) {
      dispatch(resetAllChallenges());
      // Force a reload to reflect changes globally if needed, though Redux should handle it for active components
      window.location.reload();
    }
  };

  return (
    <div className="space-y-12">
      <header className="relative py-12 px-8 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
              <Sparkles className="w-3 h-3" />
              <span>Ready to Level Up?</span>
            </div>
            <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
              Master React with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Real Challenges</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Hands-on training from Hooks to Concurrent Mode. Select a challenge below to start building. Your progress is saved automatically.
            </p>
          </div>

          <button
            onClick={handleResetAll}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-lg hover:bg-red-500 hover:text-white transition-all uppercase tracking-wider"
          >
            <Trash2 className="w-4 h-4" />
            Reset All Progress
          </button>
        </div>
      </header>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Available Challenges</h2>
          <span className="text-sm text-slate-500">Showing 30 challenges</span>
        </div>
        
        <ChallengeSelect />
      </section>
    </div>
  );
}
