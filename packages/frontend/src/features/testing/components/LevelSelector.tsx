
interface LevelSelectorProps {
  technologyName: string;
  level: string;
  count: number;
  availableCount: number;
  isSelected: boolean;
  onToggle: () => void;
  onCountChange: (count: number) => void;
}

export function LevelSelector({
  technologyName,
  level,
  count,
  availableCount,
  isSelected,
  onToggle,
  onCountChange
}: LevelSelectorProps) {
  return (
    <div className={`p-4 rounded border transition-all ${
      isSelected 
        ? 'bg-primary-900/20 border-primary-500 shadow-lg shadow-primary-900/20' 
        : 'bg-slate-900/50 border-slate-700 opacity-60 hover:opacity-100'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggle}
            className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
              isSelected ? 'bg-primary-500 border-primary-500 text-white' : 'border-slate-500 hover:border-slate-400'
            }`}
          >
            {isSelected && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <div>
            <div className="text-[10px] font-bold text-primary-400 uppercase tracking-wider leading-none mb-1">{technologyName}</div>
            <button 
              type="button" 
              onClick={onToggle}
              className="text-sm font-semibold text-white hover:text-primary-300 transition-colors"
            >
              {level}
            </button>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-500 uppercase font-bold">Pool</div>
          <div className="text-sm font-mono text-slate-300">{availableCount}</div>
        </div>
      </div>

      <div className={`space-y-2 ${!isSelected && 'pointer-events-none opacity-20'}`}>
        <div className="flex justify-between items-center">
          <label className="text-[10px] text-slate-500 uppercase font-bold">Selection: <span className="text-primary-400">{isSelected ? count : 0}</span></label>
        </div>
        <input
          type="range"
          min={0}
          max={availableCount}
          step={1}
          value={isSelected ? count : 0}
          onChange={e => onCountChange(Number(e.target.value))}
          disabled={!isSelected}
          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
        />
      </div>
    </div>
  )
}
