const fs = require('fs');
const process = require('process');
const render = require("./index").render;

const argv = Array.prototype.slice.call(process.argv, 2);
const [ jsonIn, htmlOut ] = argv;
if (jsonIn == null || !fs.existsSync(jsonIn)) {
    throw new Error(`No such JSON input file: ${jsonIn}`);
}
if (htmlOut == null) {
    throw new Error(`Must specify an output file name!`);
}
const resume = JSON.parse(fs.readFileSync(jsonIn, {encoding: 'utf8'}));
const html = render(resume);
fs.writeFileSync(htmlOut, html, {encoding: "utf8"});
