const t = require('../fn/tag');

module.exports = function renderSectionError(resume, titles, sectionName) {
    return t('div.error', `ERROR: No such section named "${sectionName}".`);
}
