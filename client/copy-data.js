import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = resolve(__dirname, '../data');
const targetDir = resolve(__dirname, 'public/data');

async function copyData() {
  try {
    // Ensure target directory exists
    await fs.ensureDir(targetDir);
    
    // Copy data directory recursively
    await fs.copy(sourceDir, targetDir, {
      overwrite: true,
      errorOnExist: false,
      filter: (src) => {
        // Skip any hidden files or directories
        const basename = src.split('/').pop();
        return !basename.startsWith('.');
      }
    });
    
    console.log('Data files copied successfully to public/data');
  } catch (err) {
    console.error('Error copying data files:', err);
    process.exit(1);
  }
}

copyData(); 