import path from 'path';
import fs from 'fs-extra';
import {ISignature, ISignatures, ISingletons} from '../actions/generate';

/* --- HELPER FUNCTIONS --- */
// Function that takes either a string or string array and converts it to a string
// ("String") -> "String"
// (["VariableDeclaration", "ExpressionStatement"]) -> "VariableDeclaration + ExpressionStatement"
const stringifySignatureProperty = (prop: string | string[]) => {
  if (typeof prop === "string") {return "one " + prop;}
  return "seq " + prop.join(" + ");
}

// Function to take an individual signature and produce a string of properties
/* ({"sourceType": "String", "body": ["VariableDeclaration", "ExpressionStatement"]})
    -> "sourceType: one String \n body: seq VariableDeclaration + ExpressionStatement"
*/
const stringifySignature = (signature: ISignature) => 
  Object.keys(signature).map(prop => ` ${prop}: ${stringifySignatureProperty(signature[prop])}`).join(",\n")

// Function to take a set of signatures and stringify it
const stringifySignatures = ({signatures}: ISignatures) => 
Object.keys(signatures).map(sig => `
sig ${sig} {
  ${stringifySignature(signatures[sig])}
}
`).join("")

const stringifySingletonProperty = (prop: string | string[]) => {
  if (typeof prop === "string") {return prop;}
  return prop.map((val, i) => `${i}->${val}`).join(" + ")
} 

const stringifySingleton = (signature: ISignature) => 
  Object.keys(signature).map(prop => `  ${prop} = ${stringifySingletonProperty(signature[prop])}`).join("\n");

const stringifySingletons = ({singletons}: ISingletons) => {
  const res = [];
  for (const sig in singletons) {
    const signatures = singletons[sig];
    for (let index in signatures) {
      const signature = signatures[index];
      res.push([
        `one sig ${sig}_${index} extends ${sig} {} {`,
        stringifySingleton(signature),
        "}"
      ].join("\n"))
    }
  }
  return res.join("\n");
}

const getInvariants = ({singletons}: ISingletons) => {
  const res = [];
  for (let sig in singletons) {
    const declaredSingletons = [];
    for (let index in singletons[sig]) {
      declaredSingletons.push(`${sig}_${index}`);
    }
    res.push(`no element:${sig} | element not in {${declaredSingletons.join(" + ")}}`);
  }
  return res.join("\n");
}

/* --- MAIN FUNCTION --- */
export const generateAlloyModel = () => {
  const signaturesPath = path.join(process.cwd(), "models/signatures.json");
  const singletonsPath = path.join(process.cwd(), "models/singletons.json"); 
  const signatures = JSON.parse(fs.readFileSync(signaturesPath, "utf8")) as ISignatures;
  const singletons = JSON.parse(fs.readFileSync(singletonsPath, "utf8")) as ISingletons;

  const models = `
/* --- SIGNATURES --- */
${stringifySignatures(signatures)}
/* --- SINGLETONS --- */
${stringifySingletons(singletons)}
/* --- INVARIANTS --- */
pred invariants {
${getInvariants(singletons)}
}

run with invariants
  `;

  fs.outputFileSync(path.join(process.cwd(), "models/models.als"), models, "utf8");
}