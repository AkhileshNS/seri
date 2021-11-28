/* --- IMPORTS --- */
import fs from 'fs-extra';
import path from 'path';
import { generateSignatures } from './../functions/generateSignatures';
import { generateSingletons } from '../functions/generateSingletons';
import { generateAlloyModel } from '../functions/generateAlloyModel';

/* --- TYPES --- */
export interface ISignature {
  [key: string]: string | string[]
}
export interface ISignatures {
  version: string;
  signatures: {
    [key: string]: ISignature;
  }
}
export interface ISingletons {
  version: string;
  singletons: {
    [key: string]: ISignature[];
  }
}

/* --- MAIN ACTION --- */
export const generateAction = () => {
  try {
    // STEP 1: Check if the models/ast.json file exists
    if (!fs.existsSync(path.join(process.cwd(), "models/ast.json"))) {
      throw new Error("Required 'models/ast.json' file is missing");
    }

    // STEP 2: Generate the models/signatures.json file
    generateSignatures();
    console.log("Generated a list of signatures from 'models/ast.json' and placed it in 'models/signatures.json'");

    // STEP 3: Generate the models/singletons.json file
    generateSingletons();
    console.log("Generated a list of singletons from 'models/ast.json' & 'models/signatures.json' and placed it in 'models/singletons.json'");

    // STEP 4: Generate the models/models.als file
    generateAlloyModel();
    console.log("Generated an alloy model from 'models/signatures.json' & 'models/singletons.json' and placed it in 'models/models.als'");
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}