import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const challengesRoot = path.resolve(__dirname, '../packages/coding-challenges/react-frontend/src/challenges');

function getChallengeDirs(dir) {
  const results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat && stat.isDirectory()) {
      // If it contains a metadata.ts, it's a challenge folder
      if (fs.existsSync(path.join(fullPath, 'metadata.ts'))) {
        results.push(fullPath);
      } else {
        results.push(...getChallengeDirs(fullPath));
      }
    }
  });
  
  return results;
}

const challengeDirs = getChallengeDirs(challengesRoot);

challengeDirs.forEach(dir => {
  const sourceDir = path.join(dir, 'source');
  const challengeFile = path.join(dir, 'Challenge.tsx');
  const targetSourceFile = path.join(sourceDir, 'Challenge.tsx');

  // Phase 1: Migration (One-time)
  // If source directory doesn't exist but Challenge.tsx does, move it into source/
  if (!fs.existsSync(sourceDir) && fs.existsSync(challengeFile)) {
    fs.mkdirSync(sourceDir, { recursive: true });
    fs.renameSync(challengeFile, targetSourceFile);
    console.log(`Migrated ${path.relative(challengesRoot, dir)} to source/ structure.`);
  }

  // Phase 2: Reset (Regular usage)
  // Copy all files from source/ to parent directory
  if (fs.existsSync(sourceDir)) {
    const files = fs.readdirSync(sourceDir);
    files.forEach(file => {
      const srcPath = path.join(sourceDir, file);
      const destPath = path.join(dir, file);
      fs.copyFileSync(srcPath, destPath);
    });
    console.log(`Reset ${path.relative(challengesRoot, dir)} from source boilerplate.`);
  }
});

console.log('\n✅ Challenge reset operation complete!');
