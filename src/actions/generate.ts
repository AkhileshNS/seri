/* --- IMPORTS --- */
import fs from 'fs-extra';
import path from 'path';

/* --- HELPER FUNCTIONS --- */

/* --- MAIN ACTION --- */
export const generateAction = () => {
  // STEP 1: Check if the models/ast.json file exists
  if (!fs.existsSync(path.join(process.cwd(), "models/ast.json"))) {
    console.error("[ERROR] Required models/ast.json file is missing");
    return;
  }

  // STEP 2: Generate the models/signatures.json file

  // STEP 3: Generate the models/singletons.json file

  // STEP 4: Generate the models/models.als file
}