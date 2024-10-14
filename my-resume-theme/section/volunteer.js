// noinspection JSDeprecatedSymbols

const t = require('../fn/tag');
const h = require('../fn/htmlEscape');
const j = require('../fn/joinWithBetween');
const a = require('../fn/listTags');
const d = require('../fn/date');
const u = require('../fn/humanUrl');
const l = require('../fn/linkify');

module.exports = function renderVolunteer(resume, titles) {
    return a(resume.volunteer, 'section', 'div', 'volunteer', `<h1>${h(titles.volunteer)}</h1>`, vol => `
        <header>${j([
        t('h2.volunteer-position', vol.position),
        d(vol, 'volunteer-dates'),
        l(vol.organization ? vol.organization : u(vol.url), vol.url, 'volunteer-url-a')
    ])}</header>
        <main>
        ${t('p.volunteer-summary', vol.summary)}
        ${a(vol.highlights, 'ul', 'li', 'volunteer-highlights')}
        </main>
    `.trim());
}
