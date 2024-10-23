import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { executeCommand } from './commander.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const coverJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'cover.json'), { encoding: 'utf8' }));

const submitted_covers = path.join(__dirname, process.env.submittedCovers);

const company = coverJson.company.split(' ').join('')
const fileName = process.env.coverFileName

const printCovers = (company, fileName) => {
  let pdfPath = `${submitted_covers}/pdf`
  let jsonPath = `${submitted_covers}/json`
  let fileWithComp = `${company}-${fileName}`
  executeCommand(
    `${process.env.chromePath} --headless --disable-gpu --print-to-pdf=${pdfPath}/${fileWithComp} --no-pdf-header-footer  http://localhost:3000/ && cp ./cover.json ${jsonPath}/${company}-cover.json`, (e) => { console.log(e) }, (s) => { console.log(s) });
};


printCovers(company, fileName)



