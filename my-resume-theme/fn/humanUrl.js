const h = require('./htmlEscape');

/**
 * Pretty-print a URL.
 * @param url  Full URL
 * @returns {string}  Pretty URL
 */
module.exports = function humanUrl(url) {
    if (typeof url === "string") {
        return h(url
            .replace(/^https?:\/\/|\/$/ig, ''))
            .replace(/^web\.archive\.org\/web\/\d+\/https?:\/\//, `[archived]&nbsp;`);
    }
    return '';
}
