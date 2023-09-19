import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

export default function Obfuscate(options = {}) {
  if (options.enable === false) {
    return {
      markup({ content }) {
        return { code: content };
      },
    };
  }
  // Current working directory
  const jsonFilePath = `${currentDir}/classMapping.json`;
  // Read the JSON file containing the old-new class name pairs
  const classMapping = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
  // console.log('twObfucs :: Starting obfuscation TailwindCSS classes...');
  return {
    markup({ content }) {
      // Replace class attribute values with their minified counterparts
      const replacedContent = content.replace(/class="([^"]*)"/g, (match, classes) => {
        const minifiedClasses = classes.split(' ').map(className => {
          // Define your class name mappings
          const classMappings = classMapping;
          return classMappings[className] || className;
        });
        return `class="${minifiedClasses.join(' ')}"`;
      });

      // console.log('twObfucs :: Obfuscation TailwindCSS classes completed.');

      // Return the modified markup
      return { code: replacedContent };
    },
  };
}