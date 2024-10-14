// noinspection JSDeprecatedSymbols

const t = require('../fn/tag');
const h = require('../fn/htmlEscape');
const j = require('../fn/joinWithBetween');
const a = require('../fn/listTags');
const d = require('../fn/date');
const fw = require('../fn/firstWord');
const l = require('../fn/linkify');

module.exports = function renderWork(resume, titles) {
    return a(resume.work, 'section', 'div', 'work', `<h1>${h(titles.work)}</h1>`, job => `
        <header>${j([
        t('h2.work-position', job.position),
        d(job, 'work-dates'),
        l(job.name, job.url, 'work-employer'),
        t('span.work-domain', job.description),
        t('span.work-location', job.location)
    ])}</header>
        <main>
        ${t('p.work-summary', job.summary)}
        ${a(job.highlights, 'ul', 'li', 'work-highlights', undefined, fw)}
        </main>
    `.trim());
}
