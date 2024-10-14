const fs = require('fs');
const path = require('path');
const commander = require('./commander.js');

const coverJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'cover.json'), {encoding: 'utf8'}));

const submitted_covers = path.join(__dirname, 'submitted_covers');

const dPath = '/Users/briandorton/Dropbox/job-hunt-2024'

const company = coverJson.company.split(' ').join('')
const fileName = 'Brian-Dorton-Cover-Letter.pdf'

const printCovers = (company, fileName) => {
    let localPath = `${submitted_covers}/${company}`
    let dropPath = `${dPath}/${company}`
    let fileWithComp = `${company}-${fileName}`
    commander.executeCommand(
      `mkdir ${localPath} && mkdir ${dropPath} && /Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --headless --disable-gpu --print-to-pdf=${localPath}/${fileWithComp} --no-pdf-header-footer  http://localhost:3000/ && cp ${localPath}/${fileWithComp}  ${dropPath}/${fileWithComp} && cp ./cover.json ${localPath}/${company}-cover.json`, (e) => {console.log(e)}, (s) => {console.log(s)});
  }; 


printCovers(company, fileName)

  

