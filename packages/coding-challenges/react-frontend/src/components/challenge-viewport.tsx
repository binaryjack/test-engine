import React, { Suspense, useMemo } from 'react';
import { Loader2 } from 'lucide-react';

interface ChallengeViewportProps {
  level: string;
  category: string;
  id: string;
}

export function ChallengeViewport({ level, category, id }: ChallengeViewportProps) {
  // Use React.lazy to dynamically import the Challenge component
  const ChallengeComponent = useMemo(() => {
    return React.lazy(() => import(`../challenges/${level}/${category}/${id}/Challenge.tsx`));
  }, [level, category, id]);

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
}
