#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { platform } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isWindows = platform() === 'win32';

console.log('🚀 Starting backend and frontend servers...\n');

// Start backend
const backendProcess = spawn('pnpm', ['dev'], {
  cwd: 'test-machine/backend',
  stdio: 'inherit',
  shell: true,
});

// Start frontend
const frontendProcess = spawn('pnpm', ['dev'], {
  cwd: 'test-machine/frontend',
  stdio: 'inherit',
  shell: true,
});

console.log('\n✅ Backend running on http://localhost:3001');
console.log('✅ Frontend running on http://localhost:5174');
console.log('\n📝 Press Ctrl+C to stop both servers\n');

// Handle cleanup
process.on('SIGINT', () => {
  console.log('\n\n🛑 Stopping servers...');
  backendProcess.kill();
  frontendProcess.kill();
  process.exit(0);
});

// Handle process exits
backendProcess.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error('❌ Backend process exited with code', code);
  }
});

frontendProcess.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error('❌ Frontend process exited with code', code);
  }
});
