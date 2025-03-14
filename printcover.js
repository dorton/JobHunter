import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { executeCommand } from './commander.js';
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const coverJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'cover.json'), { encoding: 'utf8' }));

const submitted_covers = path.join(__dirname, process.env.SUBMITTED_COVERS) || './submitted_covers';
const submitted_resumes_path = path.join(__dirname, process.env.SUBMITTED_RESUMES) || './submitted_resumes';

const company = coverJson.company.split(' ').join('') || process.env.COMPANY || 'company';
const fileName = process.env.COVER_FILE_NAME || `${company}-cover.pdf`;

const printCovers = (company, fileName) => {
  let directoryPath = `${submitted_resumes_path}/${company}-${coverJson.position.split(' ').concat(...coverJson.department.split(' ')).join('-')}`
  let pdfPath = `${submitted_covers}/pdf`
  let jsonPath = `${submitted_covers}/json`
  let fileWithComp = `${company}-${fileName}`
  let chromePath = process.env.CHROME_PATH || '/usr/bin/google-chrome-stable'
  executeCommand(
    `mkdir -p ${directoryPath} &&
    ${chromePath} --headless --disable-gpu --print-to-pdf=${pdfPath}/${fileWithComp} --no-pdf-header-footer  http://localhost:3000/ && 
    cp ./cover.json ${jsonPath}/${company}-cover.json &&
    cp ${pdfPath}/${fileWithComp} ${directoryPath}/${fileWithComp}`, (e) => { console.log(e) }, (s) => { console.log(s) });
};


printCovers(company, fileName)



