#!/usr/bin/env node

/* --- IMPORTS --- */
import {Command} from 'commander';
import {version} from '../package.json';
import { parseAction } from './actions/parse';
import { generateAction } from './actions/generate';
import { executeAction } from './actions/execute';

/* --- MAIN PROGRAM --- */
const program = new Command();
program.version(version);

// Step 1: Take a js file, generate a concise ast of it and place it in a json file 
program
  .command("parse <source>")
  .description("Takes a (by default) javascript file, generates a concise abstract syntax tree of it and places it in models/ast.json")
  .option("-l, --language <language>", "Specify the language you want to parse", "javascript")
  .action((source, options) => {parseAction(source, options)})

// Step 2: Takes the models/ast.json and generates the following:-
// - 'models/signatures.json': A file containing a list of signatures generated from the ast
// - 'models/singletons.json': A file containing a list of singletons generated from the ast and signatures
// - 'models/models.als': An alloy file containing all the singletons and signatures generated in the above two files
program
  .command("generate")
  .description("Takes the models/ast.json (If it exists) and generates a models/signatures.json file, a models/singletons.json file and a models/models.als file")
  .action(() => {generateAction()})

// Step 3: Executes the checks defined in the developer-defined properties.als on 'models/models.als'
program
  .command("execute")
  .description("Executes the checks defined in the developer-defined alloy properties on the generated ast alloy model")
  .action(() => {executeAction()})

// Step 4: Applies All of the previous steps in step
program
  .command("run <source>")
  .description("Parses the passed source file, generates an alloy model file and executes it")
  .option("-l, --language <language>", "Specify the language you want to parse", "javascript")
  .action((source, options) => {
    parseAction(source, options) &&
    generateAction() &&
    executeAction()
  })

program.parse(process.argv);