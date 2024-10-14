const t = require('../fn/tag');
const h = require('../fn/htmlEscape');
const a = require('../fn/listTags');
const j = require('../fn/joinWithBetween');

module.exports = function renderLanguages(resume, titles) {
    if (Array.isArray(resume.languages) && resume.languages.length > 1) {
        return a(resume.languages, 'section', 'div', 'language', `<h1>${h(titles.languages)}</h1>`, lang => j([
            t('span.language-language', lang.language),
            t('span.language-fluency', lang.fluency)
        ]));
    }
    return '';
}
