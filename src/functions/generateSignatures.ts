/* --- IMPORTS --- */
import path from "path"
import fs from 'fs-extra';
import {version} from '../../package.json';
import { ISignature } from "../actions/generate";
import { getType } from "../util";

/* --- HELPER FUNCTIONS --- */
const createSignatures = (ast: any) => {
  const signatures: {[key: string]: ISignature} = {};
  const stack = [ast];

  while (stack.length>0) {
    const top = stack.pop();
    const signature: ISignature = {};
    for (let prop in top) {
      if (getType(top[prop]) === "object") {
        signature[prop] = top[prop].type;
        stack.push(top[prop]);
      } else if (getType(top[prop]) === "array") {
        signature[prop] = top[prop].map(({type}: any) => type);
        top[prop].forEach((topBranch: any) => stack.push(topBranch));
      } else if (prop !== "type") {
        signature[prop] = "String";
      }
    }
    signatures[top.type] = signature;
  }

  return {version, signatures};
}

/* --- MAIN FUNCTION --- */
export const generateSignatures = () => {
  const astPath = path.join(process.cwd(), "models/ast.json");
  const ast = JSON.parse(fs.readFileSync(astPath, "utf-8"));

  const signatures = createSignatures(ast);
  const signaturesPath = path.join(process.cwd(), "models/signatures.json");
  fs.outputFileSync(signaturesPath, JSON.stringify(signatures, null, 2), "utf8");
}