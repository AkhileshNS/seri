/* --- IMPORTS --- */
import fs from 'fs-extra';
import { execSync } from 'child_process';
import path from 'path';
import { properties } from '../globals';

/* --- MAIN ACTION --- */
export const executeAction = () => {
  try {
    const propertiesPath = path.join(process.cwd(), "models/properties.als");
    fs.outputFileSync(propertiesPath, properties, "utf8");
    console.log("Created 'models/properties.als' with all the assertions that need to be checked\n")
    execSync("java -jar alloy.jar ./models/properties.als");
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}