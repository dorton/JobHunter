import express from 'express'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import reload from 'reload'

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 3000
const coverCSS = fs.readFileSync(path.join(__dirname, 'cover.css'), { encoding: 'utf8' });
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'cover.json'), { encoding: 'utf8' }));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
reload(app)

app.get('/', (req, res) => {
    res.send(render())
})


function today() {
    const today = data.date ? new Date(data.date) : new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = mm + '/' + dd + '/' + yyyy;
    return formattedToday

}

function render() {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cover Letter - ${data.me.name}</title>
    <style>${coverCSS}</style>
</head>

<body>
    <div class="letter">
        <div class="header">
            <div class="address-wrapper">
                <div>${data.me.name}</div>
                <div>${data.me.address}</div>
                <div>${data.me.city}</div>
            </div>

            <div class="links-wrapper">
                <div><a href="mailto:${data.me.email}">${data.me.email}</a> | ${data.me.phone}</div>
                <div><a href="https://linkedin.com/in/${data.me.links['linkedin']}" target="_blank">LinkedIn [${data.me.links['linkedin']}]</a> | <a
                        href="https://github.com/${data.me.links['github']}" target="_blank">GitHub [${data.me.links['github']}]</a></div>
            </div>
        </div>

        <div class="recipient-date-wrapper">
            <div class="recipient">
                ${data.department ? `<div>${data.department} Hiring Team</div>` : '<div>Hiring Team</div>'}
                <div>${data.company}</div>
                ${data.companyAddress ? `<div>${data.companyAddress}</div>` : ''}
                ${data.companyCity ? `<div>${data.companyCity}</div>` : ''}
            </div>
            <div class="date">
                <p>${today()}</p>
            </div>
        </div>

        <div class="greeting">
            ${data.department ? `<p>Dear ${data.department} Hiring Team,</p>` : ' <p>Dear Hiring Team,</p>'}
        </div>

        <div class="body">
            <p>${data.opening_paragraph}</p>

            <p>${data.current_role}</p>

            <p>${data.why_you_should_hire_me} </p>
            
            <p> ${data.additional_reasons}</p>

            <p>${data.closing_paragraph}</p>
        </div>

        <div class="closing">
            <p>Warmest Regards,<br>
                <strong>${data.me.name}</strong><br>
                <a href="mailto:${data.me.email}">${data.me.email}</a> | ${data.me.phone}<br>
            <div><a href="https://linkedin.com/in/${data.me.links['linkedin']}" target="_blank">LinkedIn [${data.me.links['linkedin']}]</a> | <a
                    href="https://github.com/${data.me.links['github']}" target="_blank">GitHub [${data.me.links['github']}]</a></div>
            </p>
        </div>
    </div>
    <script src="/reload/reload.js"></script>
</body>

</html>`
};
