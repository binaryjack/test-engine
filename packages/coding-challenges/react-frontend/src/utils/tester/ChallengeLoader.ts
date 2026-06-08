/**
 * Vite dynamic import helper for challenges and tests.
 * Vite requires static analysis for dynamic imports, so we use import.meta.glob
 * to create a map of all possible files.
 */

// Challenge components
const challengeFiles = import.meta.glob('/src/challenges/**/Challenge.tsx');

// Test suites
const testFiles = import.meta.glob('/src/challenges/**/Challenge.test.tsx');

export async function loadChallengeComponent(path: string) {
  // Path format: mid/01-hooks/01-useState-form
  const key = `/src/challenges/${path}/Challenge.tsx`;
  console.log('Loading challenge with key:', key);
  const loader = challengeFiles[key];
  
  if (!loader) {
    console.error('Available keys:', Object.keys(challengeFiles));
    throw new Error(`Challenge component not found at: ${key}`);
  }
  
  const module: any = await loader();
  return module.default;
}

export async function loadChallengeTestSuite(path: string) {
  const key = `/src/challenges/${path}/Challenge.test.tsx`;
  console.log('Loading test suite with key:', key);
  const loader = testFiles[key];
  
  if (!loader) {
    console.error('Available keys:', Object.keys(testFiles));
    throw new Error(`Test suite not found at: ${key}`);
  }
  
  const module: any = await loader();
  return module.suite;
}
