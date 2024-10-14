// noinspection JSDeprecatedSymbols

const t = require('../fn/tag');
const h = require('../fn/htmlEscape');
const j = require('../fn/joinWithBetween');
const a = require('../fn/listTags');
const dateFormat = require('../fn/dateFormat');

module.exports = function renderAwards(resume, titles) {
    return a(resume.awards, 'section', 'div', 'award', `<h1>${h(titles.awards)}</h1>`, aw => `
        <header>${j([
        t('h2.award-title', aw.title),
        t('span.award-date', dateFormat(aw.date)),
        t('span.award-awarder', aw.awarder)
    ])}</header>
        <main>
        ${t('p.award-summary', aw.summary)}
        </main>
    `.trim());
}
