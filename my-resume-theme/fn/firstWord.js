/**
 * Add a span around the first word of text.
 * Useful for CSS targeting.
 * @param text Any text.
 * @returns {string} Formatted text.
 */
module.exports = function firstWord(text) {
    if (typeof text !== "string" || text === "") {
        return '';
    }
    return text.replace(/^\s*(\w+:?)/, `<span class="first-word">$1</span>`);
}
