/**
 * Find all occurrences of a pattern in text, and optionally execute a callback for each.
 * @param text Haystack
 * @param pattern Needle
 * @param cb Mapping function
 * @returns {*[]} Array of found (optionally mapped) matches
 */
module.exports = function findAll(text, pattern, cb) {
    let m = null;
    const result = [];
    const mapper = typeof cb === "string" ? (m => m.groups[cb]) : typeof cb === "function" ? cb : typeof cb === "number" ? (m => m[cb]) : (m => m[0]);
    while ((m = pattern.exec(text)) != null) {
        result.push(mapper(m));
        if (!pattern.flags.includes("g")) {
            break;
        }
    }
    return result;
}
