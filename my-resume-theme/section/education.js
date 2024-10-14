const t = require('../fn/tag');
const h = require('../fn/htmlEscape');
const j = require('../fn/joinWithBetween');
const a = require('../fn/listTags');
const l = require('../fn/linkify');
const d = require('../fn/date');

module.exports = function renderEducation(resume, titles) {
    return a(resume.education, 'section', 'div', 'education', `<h1>${h(titles.education)}</h1>`, edu => `
        <header>${j([
        t('h2.education-area', edu.area),
        d(edu, 'education-dates'),
        t('span', edu.studyType, 'education-studyType'),
        l(edu.institution, edu.url, 'education-url'),
        t('span', edu.score, 'education-score')
    ])}</header>
        <main>
        ${a(edu.courses, 'ul', 'li', 'course')}
        </main>
    `.trim());
}
