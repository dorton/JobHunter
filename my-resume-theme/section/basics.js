// noinspection JSDeprecatedSymbols

const t = require('../fn/tag');
const h = require('../fn/htmlEscape');
const j = require('../fn/joinWithBetween');

module.exports = function renderBasics(resume) {
    const basics = resume.basics || {};
    return `
        <header id="basics">${j([
        t('h1#person-name', h(basics.name)),
        t('h2#person-label', h(basics.label)),
        t('p#person-summary', h(basics.summary))
    ])}</header>
    `.trim();
}
