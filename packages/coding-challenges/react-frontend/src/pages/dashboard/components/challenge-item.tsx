import clsx from 'clsx';
import { ArrowRight, CheckCircle2, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChallengeItemProps {
  challenge: any;
  progress: number;
}

export function ChallengeItem({ challenge, progress }: ChallengeItemProps) {
  const isCompleted = progress === 100;

  return (
    <Link 
      to={`/challenge/${challenge.id}`}
      className="group bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
          <Code className="w-6 h-6" />
        </div>
        <div className={clsx(
          "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border",
          challenge.level === 'senior' ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"
        )}>
          {challenge.level}
        </div>
      </div>

      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-1">
        {challenge.name}
      </h3>
      <p className="text-sm text-slate-400 mb-6 line-clamp-2">
        {challenge.category} — {challenge.requirements.length} Requirements
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex-1 mr-4">
          <div className="flex items-center justify-between text-[10px] mb-1">
            <span className="text-slate-500 uppercase font-bold">Progress</span>
            <span className={clsx("font-bold", isCompleted ? "text-green-500" : "text-blue-400")}>
              {progress}%
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
            <div 
              className={clsx("h-full transition-all duration-500", isCompleted ? "bg-green-500" : "bg-blue-500")}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
          {isCompleted ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <ArrowRight className="w-5 h-5" />}
        </div>
      </div>
    </Link>
  );
}
