const h = require('../fn/htmlEscape');

module.exports = function renderAvatar(resume) {
    const basics = resume.basics || {};
    if (basics.image) {
        return `<img class="no-print" src="${h(basics.image)}" id="avatar" alt="${h(basics.name)}">`
    }
    return '';
}
