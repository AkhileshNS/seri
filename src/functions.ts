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

// [IN-PLACE] USE WITH CARE
// Recursive function to remove "start" and "end"
const removeStartAndEnd = (obj: any) => {
  for (let prop in obj) {
    if (prop==="start" || prop==="end") {
      delete obj[prop];
    }
    if (Object.prototype.toString.call(obj[prop]) === "[object Object]") {
      removeStartAndEnd(obj[prop]);
    }
    if (Object.prototype.toString.call(obj[prop]) === "[object Array]") {
      for (let value of obj[prop]) {
        removeStartAndEnd(value);
      }
    }
  }
}

// The custom stringify just does JSON.stringify but also removes any "start" and "end" properties
const customStringify = (ast: acorn.Node) => {
  const parsedAst = JSON.parse(JSON.stringify(ast));
  removeStartAndEnd(parsedAst);
  return JSON.stringify(parsedAst, null, 2);
}

// Function to get the stringified AST of some js code
// ("const a = 1;") -> <AST> | To see an example of an AST output for `acorn`, check out https://astexplorer.net/
export const getAST = (content: string): string => 
  customStringify(parse(content, {
    ecmaVersion: 2020, locations: false, ranges: false
  })); 

