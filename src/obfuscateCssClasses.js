import * as fs from "fs";
import postcss from "postcss";
import { fileURLToPath } from "url";
import { dirname } from "path";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

async function obfuscateCssClasses(cssFilePath, classNameLength) {
  if (!cssFilePath) {
    console.error("twObfucs :: No CSS file path provided.");
  } else {
    console.log("twObfucs :: Starting obfuscation TailwindCSS selectors...");
    try {
      const jsonFilePath = `${currentDir}/classMapping.json`;
      const cssContent = await fs.promises.readFile(cssFilePath, "utf8");
      const classMapping = {}; // Object to store old-new class name pairs

      const result = await postcss([
        renameStandaloneClassSelectorsPlugin(classMapping, classNameLength),
      ]).process(cssContent, {
        from: cssFilePath,
      });
      // Remove pseudo-classes and pseudo-elements from the classMapping
      Object.keys(classMapping).forEach(oldClassName => {
        classMapping[oldClassName] = classMapping[oldClassName]
          .replace(/::?[^:]+$/, "")
          .replace(/\\/g, "");
      });
      await fs.promises.writeFile(cssFilePath, result.css, "utf8");
      await fs.promises.writeFile(
        jsonFilePath,
        JSON.stringify(classMapping, null, 2),
        "utf8"
      );

      console.log("twObfucs :: Obfuscation TailwindCSS selectors completed.");
    } catch (err) {
      console.log("twObfucs :: Obfuscation TailwindCSS selectors failed.");
      throw err;
    }
  }
}

function renameStandaloneClassSelectorsPlugin(classMapping, classNameLength) {
  return (root) => {
    root.walkRules((rule) => {
      rule.selectors = rule.selectors.map((selector) => {
        // Split the selector into individual classes
        const classes = selector.split(" ");
        const renamedClasses = classes.map((className) => {
          if (className.startsWith(".")) {
            // Remove the dot (.) and remove slashes backslashes (\ /) from the selector
            let oldClassName = className.slice(1);
            // Generate a new class name
            const randName = generateRandomClassName(classNameLength);
            let newClassName = randName;
            // Replace "\:" to "\@" in class name like dark\:hover\:text-white
            oldClassName = oldClassName.replaceAll("\\:", "\\@");
            // Get pseudo-classes and pseudo-elements
            const pseudoClasses = oldClassName.match(/::?[^:]+$/);
            if (pseudoClasses) {
              // Append pseudo-classes and pseudo-elements to the new class name exclude class name like dark\:hover\:text-white
              newClassName += pseudoClasses[0];
            }
            // Replace "\@" to ":"
            oldClassName = oldClassName.replaceAll("\\@", ":");
            // Remove pseudo-classes and pseudo-elements from the class name 
            const pseudoToRemove = newClassName.replace(randName, "")
            if (pseudoToRemove) {
              oldClassName = replaceLast(oldClassName, pseudoToRemove, "");
            }
            // Remove slashes backslashes (\ /) from the class name
            oldClassName = oldClassName.replaceAll("\\", "");
            // Store the mapping
            classMapping[oldClassName] = newClassName;
            return `.${newClassName}`;
          }
          return className;
        });
        // Join the renamed classes back into a compound selector
        return renamedClasses.join(" ");
      });
    });
  };
}

function generateRandomClassName(length) {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let className = "";
  for (let i = 0; i < length; i++) {
    className += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return className;
}

function replaceLast(inputString, search, replacement) {
  var lastIndex = inputString.lastIndexOf(search);

  if (lastIndex === -1) {
    // If the search string is not found, return the original input string.
    return inputString;
  }

  var beforeLast = inputString.substring(0, lastIndex); // Text before the last occurrence
  var afterLast = inputString.substring(lastIndex + search.length); // Text after the last occurrence

  return beforeLast + replacement + afterLast;
}

export default obfuscateCssClasses;