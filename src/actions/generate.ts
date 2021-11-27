/* --- IMPORTS --- */
import fs from 'fs-extra';
import path from 'path';
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
      throw new Error("Required models/ast.json file is missing");
    }

    // STEP 2: Generate the models/signatures.json file

    // STEP 3: Generate the models/singletons.json file

    // STEP 4: Generate the models/models.als file
    generateAlloyModel();
  } catch (err) {
    console.error(err);
  }
}