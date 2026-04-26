import React, { Suspense } from 'react'

/**
 * @description Wraps a component that might be asynchronously loaded or slow to render.
 * Uses the global SuspenseFallback component for consistent loading UI.
 * @param {React.Component} Component - The component to wrap.
 * @param {Object} props - Props to pass to the wrapped component (e.g., className).
 * @returns {JSX.Element} Wrapped component using React.Suspense.
 */
export const SuspenseWrapper: React.FC<{ Component: React.ComponentType<any>; fallback?: React.ReactNode; className?: string }> = ({ 
    Component, 
    fallback, 
    className = "" 
}) => {
  return (
    <div className={`relative ${className}`}>
      <Suspense fallback={<SuspenseFallback />}>
        <Component />
      </Suspense>
    </div>
  );
};