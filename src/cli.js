// #!/usr/bin/env node

import fs from 'fs';
import obfuscateCssClasses from './obfuscateCssClasses.js';

// Get the command line arguments
// --tw <cssFilePath> <classNameLength>
const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Usage: node src/cli.js --tw <cssFilePath> <classNameLength>');
  process.exit(1);
}

const cssFilePath = args[1]; // Path to the CSS file
const classNameLength = args[2] || 5; // Default class name length is 5

if (!fs.existsSync(cssFilePath)) {
  console.error(`Error: CSS file '${cssFilePath}' does not exist.`);
  process.exit(1);
}

try {
  obfuscateCssClasses(cssFilePath, classNameLength);
} catch (error) {
  console.error('An error occurred:', error.message);
}