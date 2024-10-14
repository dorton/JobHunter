const t = require('../fn/tag');
const h = require('../fn/htmlEscape');

/**
 * Try to generate a hyperlink, or at least plain text if no URL is available.
 * @param text Link text
 * @param href URL
 * @param className Additional CSS classes
 * @returns {string} Rendered a or span
 */
module.exports = function linkify(text, href, className) {
    if (typeof text !== "string" || text === "") {
        return '';
    } else if (typeof href === "string") {
        return `<a href="${h(href)}" class="${h(className)}" target="_blank" rel="external">${text}</a>`;
    } else {
        return t('span', text, 'no-url');
    }
}
