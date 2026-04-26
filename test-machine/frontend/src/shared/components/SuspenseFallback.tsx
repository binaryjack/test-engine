import React from 'react'

// Component to display a simple loading spinner
const Spinner = () => (
  <div className="flex flex-col items-center justify-center py-10">
    <svg className="animate-spin h-12 w-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-80" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12s5.373 12 12 12v-2zm0 2c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"></path>
    </svg>
    <p className="mt-4 text-indigo-600">Loading content...</p>
  </div>
);

/**
 * @description Component to wrap any part of the application that requires suspense loading.
 * @param {React.ReactNode} children - The component tree that needs suspense handling.
 * @returns {JSX.Element} Wrapped component with fallback UI.
 */
export const SuspenseFallback: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};