import fs from 'fs';
import path from 'path';
import {parse} from 'acorn';

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

/* STEP 2: Generate JSON of ast of output */
console.log(parse(output, {ecmaVersion: 2017, locations: false}));