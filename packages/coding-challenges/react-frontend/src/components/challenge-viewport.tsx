import { Loader2 } from 'lucide-react';
import React, { memo, Suspense, useMemo } from 'react';
import { loadChallengeComponent } from '../utils/tester/ChallengeLoader';

interface ChallengeViewportProps {
  level: string;
  category: string;
  path: string;
}

export const ChallengeViewport = memo(function ChallengeViewport({ path }: ChallengeViewportProps) {
  // Use React.lazy with our centralized loader to satisfy Vite's static analysis
  const ChallengeComponent = useMemo(() => {
    return React.lazy(async () => {
      const component = await loadChallengeComponent(path);
      return { default: component };
    });
  }, [path]);

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-2xl min-h-[400px]">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p>Loading Challenge Viewport...</p>
        </div>
      }>
        <ChallengeComponent />
      </Suspense>
    </div>
  );
});
