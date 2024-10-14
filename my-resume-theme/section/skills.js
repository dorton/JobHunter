const t = require('../fn/tag');
const h = require('../fn/htmlEscape');
const j = require('../fn/joinWithBetween');
const a = require('../fn/listTags');

module.exports = function renderSkills(resume, titles) {
    return a(resume.skills, 'section', skill => `div.skill-${skill.level ? skill.level : 'no-level'}`, 'skill', `<h1>${h(titles.skills)}</h1>`, skill => `
        <header>${j([
        t('h2.skill-name', skill.name),
        t('span.skill-level', skill.level)
    ])}</header>
        ${a(skill.keywords, 'ul', 'li', 'skill-keyword')}
    `.trim());
}
