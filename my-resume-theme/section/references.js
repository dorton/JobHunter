const t = require('../fn/tag');
const h = require('../fn/htmlEscape');
const a = require('../fn/listTags');

module.exports = function renderReferences(resume, titles) {
    return a(resume.references, 'section', 'div', 'reference', `<h1>${h(titles.references)}</h1>`, ref => `
        ${t('h2.reference-name', ref.name)}
        ${t('p.reference-reference', ref.reference)}
    `.trim());
}
