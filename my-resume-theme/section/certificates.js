const t = require('../fn/tag');
const h = require('../fn/htmlEscape');
const j = require('../fn/joinWithBetween');
const a = require('../fn/listTags');
const dateFormat = require('../fn/dateFormat');
const l = require('../fn/linkify');

module.exports = function renderCertificates(resume, titles) {
    return a(resume.certificates, 'section', 'div', 'certificate', `<h1>${h(titles.certificates)}</h1>`, cert => `
        <header>${j([
        t('h2.certification-name', cert.name),
        t('span.certification-date', dateFormat(cert.date)),
        l(cert.issuer, cert.url, 'certification-issuer')
    ])}</header>
    `.trim());
}
