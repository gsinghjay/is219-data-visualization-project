import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(__dirname, '..', 'data');
const targetDir = join(__dirname, 'public', 'data');

// Ensure target directory exists
fs.ensureDirSync(targetDir);

// Copy data directory recursively
fs.copySync(sourceDir, targetDir, {
  overwrite: true,
  errorOnExist: false,
  dereference: true,
  preserveTimestamps: true
});

console.log('Data files copied successfully!'); 