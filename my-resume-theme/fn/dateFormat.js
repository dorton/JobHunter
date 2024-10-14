const MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(' ');
MONTHS.unshift('');

/**
 * Really basic date formatting.
 * @param date in JSON Resume `YYYY-MM-DD` (or just the y/m parts) format
 * @returns string date in `mmm yyyy` format.
 */
module.exports = function dateFormat(date) {
    return typeof date === "string" && date !== "" ? date.replace(/^(\d+)(?:-(\d+)(?:-(\d+))?)?$/, (all, y, m, d) => {
        if (d != null) {
            return `${MONTHS[Number(m)]} ${Number(d)}, ${Number(y)}`;
        } else if (m != null) {
            return `${MONTHS[Number(m)]} ${Number(y)}`
        } else {
            return y;
        }
    }) : '';
}
