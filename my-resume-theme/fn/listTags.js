const t = require('./tag');
const h = require('./htmlEscape');

/**
 * Given an array of items, render out a container, title, and list.
 * @param obj Array
 * @param parentTagSpec Tag spec to use for the parent container
 * @param childTagSpec Tag spec to use for the child items
 * @param classPrefix Shared CSS class name prefix to use for both parent and child
 * @param hcb Header callback or string
 * @param ccb Child callback or string
 * @returns {string} Rendered tags
 */
module.exports = function listTags(obj, parentTagSpec, childTagSpec, classPrefix, hcb, ccb) {
    if (!Array.isArray(obj) || obj.length === 0) {
        return '';
    }
    let body = obj
        .map(ccb || (s => s))
        .map((i, n) => t(typeof childTagSpec === "function" ? childTagSpec(i) : childTagSpec, i, `${h(classPrefix)}-item item-${n} ${n === obj.length - 1 ? 'item-last' : ''} item`));
    if (typeof hcb === "function") {
        body.unshift(hcb());
    } else if (typeof hcb === "string") {
        body.unshift(hcb);
    }
    return t(`${typeof parentTagSpec === "function" ? parentTagSpec(obj) : parentTagSpec}.${classPrefix}-list.list`, body.join(''));
}
