/* --- IMPORTS --- */
import path from 'path';
import {parse} from 'acorn';

/* --- HELPER FUNCTIONS --- */

// Function to get command line options from the passed args
// Assuming "seri main.js" is executed on the command line 
// () -> {path: <FULLPATH to main.js>} | <FULLPATH to main.js> could be "C:\_WORKING\Development\seri\main.js"
interface IOptions {
  path: string;
}
export const getOptions = (): IOptions => {
  // Get the passed path which is the last element in process.argv
  const passedPath = process.argv[process.argv.length-1];
  return {path: path.join(process.cwd(), passedPath)}
}

// Function to get the stringified AST of some js code
// ("const a = 1;") -> <AST> | To see an example of an AST output for `acorn`, check out https://astexplorer.net/
export const getAST = (content: string): string => 
  JSON.stringify(parse(content, {ecmaVersion: 2020, locations: false, ranges: false}), null, 2); 