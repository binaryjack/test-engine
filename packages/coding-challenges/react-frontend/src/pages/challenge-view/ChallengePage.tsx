import clsx from 'clsx';
import { AlertTriangle, ChevronLeft, Info, Trophy, X } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { challengeRegistry } from '../../challenges/index.js';
import { ChallengeViewport } from '../../components/challenge-viewport.js';
import { Requirements } from '../../components/requirements.js';
import { RootState } from '../../store/index.js';
import { ExamTimer } from './components/ExamTimer.js';
import { closeExamModal, loadChallenge } from './store/challenge.slice.js';

export default function ChallengePage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { isExamMode, isExamFinished } = useSelector((state: RootState) => state.challenge);
  
  const challenge = useMemo(() => 
    challengeRegistry.find(c => c.id === id), 
  [id]);

  useEffect(() => {
    if (challenge) {
      dispatch(loadChallenge({
        id: challenge.id,
        requirements: challenge.requirements,
        estimatedTime: challenge.estimatedTime
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
    <div className="max-w-[1600px] mx-auto relative">
      {/* Exam Finished Modal */}
      {isExamFinished && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
          <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl text-center">
            <button 
              onClick={() => dispatch(closeExamModal())}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Exam Time Up!</h2>
            <p className="text-slate-400 mb-8">
              The simulation has ended. Review your results and requirements to see how you did. You can continue working in practice mode.
            </p>
            <button
              onClick={() => dispatch(closeExamModal())}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20"
            >
              Back to Practice
            </button>
          </div>
        </div>
      )}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link 
            to="/" 
            className={clsx(
              "flex items-center gap-1 transition-colors text-sm mb-2",
              isExamMode ? "pointer-events-none opacity-20" : "text-slate-400 hover:text-white"
            )}
          >
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
            category={challenge.path.split('/')[1]} 
            id={challenge.path.split('/')[2]} 
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
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <ExamTimer />
          <Requirements />
        </div>
      </div>
    </div>
  );
}
