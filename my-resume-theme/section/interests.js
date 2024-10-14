const t = require('../fn/tag');
const h = require('../fn/htmlEscape');
const a = require('../fn/listTags');

module.exports = function renderInterests(resume, titles) {
    return a(resume.interests, 'section', 'div', 'interest', `<h1>${h(titles.interests)}</h1>`, int => `
        <header>${t('h2.interest-name', int.name)}</header>
        ${a(int.keywords, 'ul', 'li', 'interest-keyword')}
    `.trim());
}
