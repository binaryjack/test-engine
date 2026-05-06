import clsx from 'clsx';
import { Play, Square, Timer } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { startExam, stopExam } from '../store/challenge.slice';

export function ExamTimer() {
  const { examTimeLeft, isExamMode } = useSelector((state: RootState) => state.challenge);
  const dispatch = useDispatch();

  const minutes = Math.floor(examTimeLeft / 60);
  const seconds = examTimeLeft % 60;

  const handleToggleExam = () => {
    if (isExamMode) {
      if (window.confirm("End exam simulation? Progress will be saved but the timer will stop.")) {
        dispatch(stopExam());
      }
    } else {
      if (window.confirm("Start Exam Simulation? This will lock navigation and start the countdown.")) {
        dispatch(startExam());
      }
    }
  };

  return (
    <div className={clsx(
      "flex items-center justify-between bg-slate-900 border p-4 rounded-xl shadow-lg transition-all",
      isExamMode ? "border-red-500/50 bg-red-500/5" : "border-slate-800"
    )}>
      <div className="flex items-center gap-4">
        <div className={clsx(
          "p-2 rounded-lg",
          isExamMode ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
        )}>
          <Timer className={clsx("w-6 h-6", isExamMode && "animate-pulse")} />
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            {isExamMode ? "Exam in Progress" : "Simulation Mode"}
          </div>
          <div className={clsx(
            "text-2xl font-mono font-bold leading-none",
            isExamMode ? "text-red-400" : "text-white"
          )}>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
        </div>
      </div>
      
      <button
        onClick={handleToggleExam}
        className={clsx(
          "flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all",
          isExamMode 
            ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20" 
            : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20"
        )}
      >
        {isExamMode ? (
          <>
            <Square className="w-4 h-4 fill-current" />
            Stop Exam
          </>
        ) : (
          <>
            <Play className="w-4 h-4 fill-current" />
            Start Exam
          </>
        )}
      </button>
    </div>
  );
}
