/* --- IMPORTS --- */
import path from "path";
import fs from "fs-extra";
import {parse} from 'acorn';

/* --- HELPER FUNCTIONS --- */

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

/* -- CONSTANTS --- */
const supported = ["javascript"];

/* --- MAIN ACTION --- */
interface IOptions {
  language: string;
}

export const parseAction = (source: string, options: IOptions) => {
  try {
    if (!supported.includes(options.language)) {
      throw new Error(`Language not supported (Supported languages: [${supported.join(", ")}])`);
    }

    /* STEP 1: */ const filepath = path.join(process.cwd(), source);
    /* STEP 2: */ const content = fs.readFileSync(filepath, "utf8");
    /* STEP 3: */ const parsedContent = getAST(content);
    /* STEP 4: */ fs.outputFileSync(path.join(process.cwd(), "models/ast.json"), parsedContent, "utf-8");
    console.log(`Compiled consolidated abstract syntax tree from '${source}' and placed it in 'models/ast.json'`)
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}