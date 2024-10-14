const s = require('../fn/stringify');

/**
 * Given a list of elements, inject empty "between" elements useful for CSS targeting.
 * @param delimiter An optional element to be used as the delimiter
 * @param items List of elements
 * @returns string Joined text
 */
module.exports = function joinWithBetween(delimiter, items) {
    let parts = items;
    let delim;
    if (Array.isArray(delimiter)) {
        parts = delimiter;
        delim = '<span class="between"></span>';
    } else {
        delim = s(delimiter);
    }
    return !Array.isArray(parts) || parts.length === 0 ? ""
        : parts.map(item => s(item))
            .filter(item => item != null && item !== "")
            .join(delim);
}
