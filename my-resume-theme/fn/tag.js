const h = require('./htmlEscape');
const findAll = require('./findAll');

/**
 * Render out a tag.
 * @param tagSpec HAML-style tag name, id, and CSS classes
 * @param text Inner-text
 * @param className Additional CSS classes, for when the spec would be inconvenient
 * @returns {string} Rendered tag
 */
module.exports = function tag(tagSpec, text, className) {
    if (typeof text !== "string" || text === "") {
        return '';
    }
    const id = findAll(tagSpec, /#([^.@#]+)/, 1)[0];
    const classNames = findAll(tagSpec, /\.([^.@#]+)/g, 1);
    const tagName = tagSpec.replace(/[.@#].*$/, '');
    return `<${tagName}${id ? ` id="${h(id)}"` : ''} class="${classNames.join(' ')} ${h(className || '')}">${text}${tagName === "img" ? '' : `</${tagName}>`}`;
}
