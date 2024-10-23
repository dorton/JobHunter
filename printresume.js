import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { executeCommand } from './commander.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const coverJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'cover.json'), { encoding: 'utf8' }));
const submitted_resumes_path = path.join(__dirname, process.env.submittedResumes);
const submitted_jobs_path = path.join(__dirname, submittedJobs);
const resume_html_path = path.join(__dirname, 'resume.html');

const company = coverJson.company.split(' ').join('')
const fileName = process.env.resumeFileName

const printCovers = (company, fileName) => {
  let pdfPath = `${submitted_resumes_path}/pdf`
  let jsonPath = `${submitted_resumes_path}/json`
  let fileWithComp = `${company}-${fileName}`
  executeCommand(
    `${process.env.chromePath} --headless --disable-gpu --print-to-pdf=${pdfPath}/${fileWithComp} --no-pdf-header-footer  file:///${resume_html_path} && 
    cp ./resume.json ${jsonPath}/${company}-resume.json && 
    cp ./job.json ${submitted_jobs_path}/${company}-job.json`, (e) => {
    console.log(e)
  }, (s) => { console.log(s) });
};


printCovers(company, fileName)

