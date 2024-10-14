/**
 * The world's dumbest HTML escaping.
 * @param text Plaintext
 * @returns {string} HTML-escaped text.
 */
module.exports = function htmlEscape(text) {
    if (typeof text === "string") {
        return text.replace(/[\u00A0-\u9999<>&]/g, c => `&#${c.charCodeAt(0)};`);
    }
    return '';
}
