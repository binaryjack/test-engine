import { Sparkles } from 'lucide-react';
import { ChallengeSelect } from './components/challenge-select';

export default function DashboardPage() {
  return (
    <div className="space-y-12">
      <header className="relative py-12 px-8 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-3xl" />
        
        <div className="relative z-10 max-w-2xl">
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
