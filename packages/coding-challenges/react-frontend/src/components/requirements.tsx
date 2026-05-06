import clsx from 'clsx';
import { AlertCircle, CheckCircle2, Circle, Loader2, PlayCircle, RotateCcw } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { resetChallenge, runVerification, toggleRequirement } from '../pages/challenge-view/store/challenge.slice';
import { RootState } from '../store';

export function Requirements({ hasTests }: { hasTests?: boolean }) {
  const requirements = useSelector((state: RootState) => state.challenge.requirements);
  const isVerifying = useSelector((state: RootState) => state.challenge.isVerifying);
  const testResults = useSelector((state: RootState) => state.challenge.testResults);
  const dispatch = useDispatch();

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your progress for this challenge? This cannot be undone.")) {
      dispatch(resetChallenge());
    }
  };

  const handleVerify = () => {
    dispatch(runVerification());
  };
  
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-xl h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span className="bg-blue-500/10 text-blue-400 p-1 rounded-md">
            <CheckCircle2 className="w-5 h-5" />
          </span>
          Project Requirements
        </h2>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleReset}
            className="text-slate-500 hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-500/10"
            title="Reset progress"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3 flex-1 overflow-y-auto">
        {requirements.map((req) => (
          <RequirementItem 
            key={req.id} 
            requirement={req} 
            testResult={testResults[req.id]}
          />
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
        {hasTests && (
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 group"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Run Verification
              </>
            )}
          </button>
        )}

        <div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Progress</span>
            <span className="text-blue-400 font-medium">
              {Math.round((requirements.filter(r => r.completed).length / (requirements.length || 1)) * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${(requirements.filter(r => r.completed).length / (requirements.length || 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function RequirementItem({ requirement, testResult }: { requirement: any, testResult?: { passed: boolean, error?: string } }) {
  const dispatch = useDispatch();
  
  return (
    <div className="group relative">
      <button
        onClick={() => dispatch(toggleRequirement(requirement.id))}
        className={clsx(
          "w-full flex items-start gap-3 p-3 rounded-lg border transition-all text-left",
          requirement.completed 
            ? "bg-green-500/5 border-green-500/20 text-green-100" 
            : testResult && !testResult.passed
              ? "bg-red-500/5 border-red-500/20 text-red-200"
              : "bg-slate-800/30 border-slate-800 hover:border-slate-700 text-slate-300"
        )}
      >
        <div className="mt-0.5">
          {requirement.completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : testResult && !testResult.passed ? (
            <AlertCircle className="w-5 h-5 text-red-500" />
          ) : (
            <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <span className={clsx("text-sm leading-relaxed", requirement.completed && "line-through text-slate-500")}>
            {requirement.text}
          </span>
          {testResult && !testResult.passed && (
            <div className="text-[10px] text-red-400 mt-1 font-mono line-clamp-1 overflow-hidden">
              {testResult.error}
            </div>
          )}
        </div>
      </button>
      
      {/* Tooltip for error message */}
      {testResult && !testResult.passed && testResult.error && (
        <div className="absolute left-full ml-2 top-0 z-50 w-64 p-3 bg-red-900 text-red-100 text-xs rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-red-700">
          <div className="font-bold mb-1">Test Failed:</div>
          {testResult.error}
        </div>
      )}
    </div>
  );
}
