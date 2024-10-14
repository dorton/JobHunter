const t = require('../fn/tag');
const h = require('../fn/htmlEscape');
const j = require('../fn/joinWithBetween');
const a = require('../fn/listTags');
const d = require('../fn/date');
const u = require('../fn/humanUrl');
const l = require('../fn/linkify');

module.exports = function renderProjects(resume, titles) {
    return a(resume.projects, 'section', proj => `div.project-${proj.type ? proj.type : 'no-type'}`, 'project', `<h1>${h(titles.projects)}</h1>`, proj => `
        <header>${j([
        t('h2.project-name', proj.name),
        d(proj, 'project-dates'),
        l(u(proj.url), proj.url, 'project-url-a'),
        t('p.project-entity', proj.entity),
        a(proj.roles, 'ul', 'li', 'project-role')
    ])}
        </header>
        <main>
        ${t('p.project-description', proj.description)}
        ${a(proj.highlights, 'ul', 'li', 'project-highlights')}
        </main>
        <footer>
        ${a(proj.keywords, 'ul', 'li', 'project-keyword')}
        </footer>
    `.trim());
}
