const h = require('./htmlEscape');
const t = require('./tag');
const dateFormat = require('./dateFormat');

/**
 * Render a date or range from a JSON Resume object which has `startDate` and/or `endDate`.
 * @param obj JSON Resume sub-object (like a `work` item)
 * @param className Any additional CSS class names you want to add to the top-level element.
 * @returns {string} Rendered element (span).
 */
module.exports = function date(obj, className) {
    const startDate = (obj || {}).startDate;
    const endDate = (obj || {}).endDate;
    if (obj == null || (startDate == null && endDate == null)) {
        return '';
    }
    return `
        <span class="dates ${h(className)} ${startDate ? `has` : 'no'}-start ${endDate ? `has` : 'no'}-end ${startDate === endDate ? 'same-dates' : ''}">${t('span', h(dateFormat(startDate)), 'date-start')}<span class="date-delimiter"></span>${t('span', h(dateFormat(endDate)), 'date-end')}</span>
    `.trim();
}
