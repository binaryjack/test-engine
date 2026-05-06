import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChallengeViewport } from '../../components/challenge-viewport';
import { Requirements } from '../../components/requirements';
import { loadChallenge } from './store/challenge.slice';
import { RootState } from '../../store';
import { ChevronLeft, Info, AlertTriangle } from 'lucide-react';
import { challengeRegistry } from '../../challenges';

export default function ChallengePage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  
  const challenge = useMemo(() => 
    challengeRegistry.find(c => c.id === id), 
  [id]);

  useEffect(() => {
    if (challenge) {
      dispatch(loadChallenge({
        id: challenge.id,
        requirements: challenge.requirements
      }));
    }
  }, [challenge, dispatch]);

  if (!challenge) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Challenge Not Found</h2>
        <p className="text-slate-400 mb-8">The challenge you are looking for does not exist or has been moved.</p>
        <Link to="/" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
          Go back to Challenges
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link to="/" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-sm mb-2">
            <ChevronLeft className="w-4 h-4" />
            Back to Challenges
          </Link>
          <h1 className="text-3xl font-bold text-white">{challenge.name}</h1>
          <p className="text-slate-400 mt-1">{challenge.category} — Level: {challenge.level}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${
            challenge.level === 'senior' 
              ? "bg-red-500/10 border-red-500/20 text-red-400" 
              : "bg-blue-500/10 border-blue-500/20 text-blue-400"
          }`}>
            {challenge.level} Level
          </div>
          <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider">
            {challenge.category}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Challenge Viewport */}
        <div className="lg:col-span-8 space-y-6">
          <ChallengeViewport 
            level={challenge.level} 
            category={challenge.path.split('/')[1]} // extract category folder
            id={challenge.path.split('/')[2]} // extract challenge slug
          />
          
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6">
             <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
               <Info className="w-4 h-4" />
               Helpful Tips
             </h3>
             <ul className="text-slate-300 text-sm space-y-2 list-disc pl-5">
               <li>Read the requirements carefully before starting.</li>
               <li>Check the boxes as you complete each task to save your progress.</li>
               <li>Use the developer console to debug if something isn't working as expected.</li>
             </ul>
          </div>
        </div>

        {/* Right: Requirements Panel */}
        <div className="lg:col-span-4 sticky top-24">
          <Requirements />
        </div>
      </div>
    </div>
  );
}
