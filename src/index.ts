/* --- IMPORTS --- */
import fs from 'fs';
import path from 'path';
import {getOptions, getAST} from './functions';

/* --- MAIN PROGRAM --- */
/* STEP: */ const options = getOptions();
/* STEP: */ const content = fs.readFileSync(options.path, "utf8");
/* STEP: */ const parsedContent = getAST(content);
/* STEP: */ fs.writeFileSync(path.join(process.cwd(), "execution.json"), parsedContent, "utf-8");