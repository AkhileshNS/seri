// Command Line Tools
// REGULAR EXPRESSION: const [A-z] = ["'`]?\w+["'`]?;
// Imports
const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

// Helper function
const getType = s => 
  s==="true" || s==="false"              ? "boolean" :
  s[0]==='"' || s[0]==="'" || s[0]==="`" ? "string"  :
  "number"

const getContext = s => 
  s==="const" ? "Init-Constant" :
  s==="let"   ? "Init-Variable" :
  "Set-Value"

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
const exp = /(const|let)?[ ]?(\w+) = (((\w+|\d+)|["'`](\w+|\d+)["'`])|(["'`]|\n)((\s|\t|\w+|\d+|\n)["'`]));/gm;

/* STEP 4: Parse the expression */
const matches = formatted_output.match(exp);

/* STEP 5: Loop through and extract information */
const parsed_output = [];
for (let match of matches) {
  const output = /(const|let)?[ ]?(\w+) = (((\w+|\d+)|["'`](\w+|\d+)["'`])|(["'`]|\n)((\s|\t|\w+|\d+|\n)["'`]));/gm.exec(match)
  if (output!==null) {
    const context = getContext(output[1]);
    const name = output[2];
    const value = output[3];
    const type = getType(output[2]);
    parsed_output.push({context, name, value, type});
  }
}

/* STEP 6: Create the "execution.json" file with parsed_output */
const executionJsonPath = path.join(process.cwd(), "execution.json");
fs.writeFileSync(executionJsonPath, JSON.stringify({lines: parsed_output}, null, 2), 'utf8');

/* STEP 7: Go into main.als and change the @Generated block */
const mainAlsPath = path.join(process.cwd(), "main.als");
const mainAlsContent = fs.readFileSync(mainAlsPath, "utf8");
const mainAlsContentArray = mainAlsContent.split("// @Generated");
const mainAlsContentArrayProcessed = [
  mainAlsContentArray[0],
  ...mainAlsContentArray[1].split("// @End")
];
mainAlsContentArrayProcessed[1] = parsed_output.map((val, index) => `
one sig L${index+1} extends Line {}{
  context = "${val.context}"
  name = "${val.name}"
  value = "${val.value}"
  type = "${val.type}"
}
`)
const mainAlsNewContent = 
  mainAlsContentArrayProcessed[0] + 
  "\n// @Generated\n" +
  mainAlsContentArrayProcessed[1]
  "\n// @End\n" +
  mainAlsContentArrayProcessed[2]
fs.writeFileSync(mainAlsPath, mainAlsNewContent, "utf8");