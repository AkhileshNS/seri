// Command Line Tools
// REGULAR EXPRESSION: const [A-z] = ["'`]?\w+["'`]?;
// Imports
const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

// Helper function
const getType = s => {
  if (s==="true" || s==="false") {return "boolean";}
  if (s[0]==='"' || s[0]==="'" || s[0]==="`") {return "string";}
  return "number";
}

// Get CLI Args
const args = process.argv.slice(2);

if (args.length<1) {
  process.exit(1)
}

// Check here that the file exists in the folder
const currentFolder = process.cwd();
const filename = args[0];
const file = path.join(currentFolder, filename)
/* STEP 1: Read file */ 
const output = fs.readFileSync(file, "utf8");
/* STEP 2: Format output */ 
const formatted_output = prettier.format(output);
/* STEP 3: Define parsing expression */
const exp = /const (\w+) = (((\w+|\d+)|["'`](\w+|\d+)["'`])|(["'`]|\n)((\s|\t|\w+|\d+|\n)["'`]));/gm;
/* STEP 4: Parse the expression */
const matches = formatted_output.match(exp);
/* STEP 5: Loop through and extract information */
const parsed_output = [];
for (let match of matches) {
  const output = /const (\w+) = (((\w+|\d+)|["'`](\w+|\d+)["'`])|(["'`]|\n)((\s|\t|\w+|\d+|\n)["'`]));/gm.exec(match)
  if (output!==null) {
    const name = output[1];
    const value = output[2];
    const type = getType(output[2]);
    parsed_output.push({
      context: "Init-Constant",
      name, value, type
    });
  }
}
/* STEP 6: Create the "execution.json" file with parsed_output */
const executionJsonPath = path.join(process.cwd(), "execution.json");
fs.writeFileSync(executionJsonPath, JSON.stringify({lines: parsed_output}, null, 2), 'utf8');
