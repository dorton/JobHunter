/**
 * Render out a function or a string to string form.
 * Useful for "just do what I mean" coding.
 * @param item Function or string
 * @param thisArg For a function, the `this` argument to use when calling
 * @param args For a function, the arguments to use when calling.
 * @returns {string|undefined} Rendered result
 */
module.exports = function stringify(item, thisArg, args) {
    if (typeof item === "string") {
        return item;
    } else if (typeof item === "function") {
        return item.apply(thisArg, args || []);
    }
    return undefined;
}
