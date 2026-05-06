import clsx from 'clsx';
import { CheckCircle2, Circle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleRequirement } from '../pages/challenge-view/store/challenge.slice';
import { RootState } from '../store';

export function Requirements() {
  const { requirements } = useSelector((state: RootState) => state.challenge);
  
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-xl h-full">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="bg-blue-500/10 text-blue-400 p-1 rounded-md">
          <CheckCircle2 className="w-5 h-5" />
        </span>
        Project Requirements
      </h2>
      
      <div className="space-y-3">
        {requirements.map((req) => (
          <RequirementItem key={req.id} requirement={req} />
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-slate-800">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Progress</span>
          <span className="text-blue-400 font-medium">
            {Math.round((requirements.filter(r => r.completed).length / requirements.length) * 100)}%
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
  );
}

function RequirementItem({ requirement }: { requirement: any }) {
  const dispatch = useDispatch();
  
  return (
    <button
      onClick={() => dispatch(toggleRequirement(requirement.id))}
      className={clsx(
        "w-full flex items-start gap-3 p-3 rounded-lg border transition-all text-left group",
        requirement.completed 
          ? "bg-green-500/5 border-green-500/20 text-green-100" 
          : "bg-slate-800/30 border-slate-800 hover:border-slate-700 text-slate-300"
      )}
    >
      <div className="mt-0.5">
        {requirement.completed ? (
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        ) : (
          <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-400 transition-colors" />
        )}
      </div>
      <span className={clsx("text-sm leading-relaxed", requirement.completed && "line-through text-slate-500")}>
        {requirement.text}
      </span>
    </button>
  );
}
