#!/usr/bin/env node

/* --- IMPORTS --- */
import fs from 'fs';
import path from 'path';
import {Command} from 'commander';
import {getOptions, getAST} from './functions';
import {version} from '../package.json';

/* --- MAIN PROGRAM --- */
const program = new Command();
program.version(version);

// Step 1: Take a js file, generate a concise ast of it and place it in a json file 
program
  .command("parse <source>")
  .description("Takes a (by default) javascript file, generates a concise abstract syntax tree of it and places it in models/ast.json")
  .option("-l, --language <language>", "Specify the language you want to parse", "javascript")
  .action((source, options) => {/* Parse Source */ console.log(`You've called 'program parse ${source} --language=${options.language}'`)})

// Step 2: Takes the models/ast.json and generates a models/signatures.json file and a models/singletons.json file


program.parse(process.argv);

/* STEP: */ // const options = getOptions();
/* STEP: */ // const content = fs.readFileSync(options.path, "utf8");
/* STEP: */ // const parsedContent = getAST(content);
/* STEP: */ // fs.writeFileSync(path.join(process.cwd(), "execution.json"), parsedContent, "utf-8");