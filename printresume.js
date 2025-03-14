import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { executeCommand } from './commander.js';
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const coverJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'cover.json'), { encoding: 'utf8' }));
const submitted_resumes_path = path.join(__dirname, `${process.env.SUBMITTED_RESUMES}`) || './submitted_resumes';
const submitted_jobs_path = path.join(__dirname, `${process.env.SUBMITTED_JOBS}`) || './submitted_jobs';
const resume_html_path = path.join(__dirname, 'resume.html');

const company = coverJson.company.split(' ').join('')
const fileName = process.env.RESUME_FILE_NAME || `${company}-resume.pdf`;

const printCovers = (company, fileName) => {
  let directoryPath = `${submitted_resumes_path}/${company}-${coverJson.position.split(' ').concat(...coverJson.department.split(' ')).join('-')}`
  let pdfPath = `${submitted_resumes_path}/pdf`
  let jsonPath = `${submitted_resumes_path}/json`
  let fileWithComp = `${company}-${fileName}`
  let chromePath = process.env.CHROME_PATH || '/usr/bin/google-chrome-stable'
  executeCommand(
    `mkdir -p ${directoryPath} &&
    ${chromePath} --headless --disable-gpu --print-to-pdf=${directoryPath}/${fileWithComp} --no-pdf-header-footer  file:///${resume_html_path} && 
    cp ./resume.json ${jsonPath}/${company}-resume.json && 
    cp ./job.json ${submitted_jobs_path}/${company}-job.json`, (e) => {
    console.log(e)
  }, (s) => { console.log(s) });
};


printCovers(company, fileName)

