// noinspection JSDeprecatedSymbols

const t = require('../fn/tag');
const h = require('../fn/htmlEscape');
const j = require('../fn/joinWithBetween');
const a = require('../fn/listTags');
const dateFormat = require('../fn/dateFormat');
const u = require('../fn/humanUrl');
const l = require('../fn/linkify');

module.exports = function renderPublications(resume, titles) {
    return a(resume.publications, 'section', 'div', 'publication', `<h1>${h(titles.publications)}</h1>`, pub => `
        <header>${j([
        t('h2.publication-name', pub.name),
        t('span.publication-date', dateFormat(pub.releaseDate)),
        t('span.publication-publisher', pub.publisher),
        l(u(pub.url), pub.url, 'publication-url-a')
    ])}
        </header>
        <main>
        ${t('p.publication-summary', pub.summary)}
        </main>
    `.trim());
}
