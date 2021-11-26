#!/usr/bin/env node

/* --- IMPORTS --- */
import {Command} from 'commander';
import {version} from '../package.json';
import { parseAction } from './actions/parse';
import { generateAction } from './actions/generate';

/* --- MAIN PROGRAM --- */
const program = new Command();
program.version(version);

// Step 1: Take a js file, generate a concise ast of it and place it in a json file 
program
  .command("parse <source>")
  .description("Takes a (by default) javascript file, generates a concise abstract syntax tree of it and places it in models/ast.json")
  .option("-l, --language <language>", "Specify the language you want to parse", "javascript")
  .action(parseAction)

// Step 2: Takes the models/ast.json and generates a models/signatures.json file and a models/singletons.json file
program
  .command("generate")
  .description("Takes the models/ast.json (If it exists) and generates a models/signatures.json file, a models/singletons.json file and a models/models.als file")
  .action(generateAction)

program.parse(process.argv);