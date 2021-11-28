/* --- IMPORTS --- */
import fs from 'fs-extra';
import path from 'path';
import { ISingletons, ISignature, ISignatures } from '../actions/generate';
import {version} from '../../package.json';
import {getType} from '../util';

/* --- HELPER FUNCTIONS --- */
const createReferences = (astBranch: any, singletons: {[key: string]: ISignature[]}) => {
  const referencesObj: {[key: string]: number} = {};
  for (let {type} of astBranch) {
    if (!(type in referencesObj)) {
      referencesObj[type] = singletons[type].length+1;
    } else {
      referencesObj[type]++;
    }
  }
  
  const references: string[] = [];
  for (let key in referencesObj) {
    for (let i=0; i<referencesObj[key]; i++) {
      references.push(key + "_" + i);
    }
  }

  return references;
}

const createSingletons = (ast: any, {signatures}: ISignatures): ISingletons => {
  const singletons: {[key: string]: ISignature[]} = {};

  // STEP 1: Populate Singletons with signature names
  for (let sig in signatures) {
    singletons[sig] = [];
  }

  // STEP 2: Populate Singletons with signatures
  const stack = [ast];
  while (stack.length>0) {
    const top = stack.pop();
    // Create a singleton and add it to the list of singletons
    const singleton: ISignature = {};
    for (let prop in top) {
      if (getType(top[prop]) === "object") {
        const sig = top[prop].type;
        singleton[prop] = sig + "_" + singletons[sig].length;
        stack.push(top[prop]);
      } else if (getType(top[prop]) === "array") {
        singleton[prop] = createReferences(top[prop], singletons);
        top[prop].forEach((topBranch: any) => stack.push(topBranch));
      } else if (prop !== "type") {
        singleton[prop] = JSON.stringify(top[prop].toString());
      }
    }
    singletons[top.type].push(singleton);
  }

  return {version, singletons};
} 

/* --- MAIN FUNCTION --- */
export const generateSingletons = () => {
  const astPath = path.join(process.cwd(), "models/ast.json");
  const signaturesPath = path.join(process.cwd(), "models/signatures.json");
  const ast = JSON.parse(fs.readFileSync(astPath, "utf8"));
  const signatures = JSON.parse(fs.readFileSync(signaturesPath, "utf8"));

  const singletons = createSingletons(ast, signatures);
  const singletonsPath = path.join(process.cwd(), "models/singletons.json");
  fs.writeFileSync(singletonsPath, JSON.stringify(singletons, null, 2), "utf8");
}