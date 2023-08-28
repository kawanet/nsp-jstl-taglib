import {cdate} from "cdate";
import type {NSP} from "nsp-server-pages";
import type {JstlFmt, JstlUtil} from "../../index.js";
import {TimeZone} from "../util/TimeZone.js";
import {fmtSetLocaleStore} from "./SetLocaleTag.js";
import {fmtSetTimeZoneStore} from "./TimeZoneTag.js";

/**
 * <fmt:formatDate>
 * org.apache.taglibs.standard.tag.rt.fmt.FormatDateTag
 *
 * @description
 * Formats a date and/or time using the supplied styles and pattern
 */
export const formatDateTag: NSP.TagFn<JstlFmt.FormatDateTagAttr> = (tag) => {
    return (context) => {

        const {value, var: varName, pattern, type, dateStyle, timeStyle, timeZone} = tag.attr(context);
        if (!value) {
            if (varName) context[varName] = null;
            return tag.body(context);
        }

        let tz: JstlUtil.TimeZone;
        if (timeZone) {
            tz = TimeZone.getTimeZone(timeZone);
        } else {
            tz = fmtSetTimeZoneStore(tag.app, context).get();
        }

        let dt = cdate(value);
        if (tz) {
            const minutes = tz.getOffset(+dt) / 60000;
            dt = dt.utcOffset(minutes);
        }

        const store = fmtSetLocaleStore(tag.app, context);
        const locale = store.get()?.getLanguage();
        if (locale) {
            dt = dt.locale(locale);
        }

        let result: string;

        if (pattern) {
            dt = dt.handler(formatMap);
            result = applyPattern(dt, pattern);
        } else {
            const format = getFormatOptions(type, dateStyle, timeStyle);

            try {
                // use Intl.DateTimeFormat per default
                if (tz) format.timeZone = tz.getDisplayName();
                result = new Intl.DateTimeFormat(locale, format).format(dt.toDate());
            } catch (e) {
                // fallback to strftime
                // RangeError: Invalid time zone specified: GMT+09:00
                const {dateStyle, timeStyle} = format;
                const pattern = (dateStyle && timeStyle) ? "%c" : timeStyle ? "%H:%M:%S" : "%Y-%m-%d";
                result = dt.text(pattern);
            }
        }

        if (varName) {
            context[varName] = result;
        } else {
            return result;
        }
    };
};

const applyPattern = (dt: cdate.CDate, pattern: string): string => {
    if (/'/.test(pattern)) {
        return pattern.split(/'/).map((part, index) => {
            if (index & 1) {
                // quoted
                return (part === "") ? "'" : part;
            } else {
                return (part === "") ? "" : applyPattern(dt, part);
            }
        }).join("");
    }

    return dt.format(pattern);
};

const G: cdate.Handler = dt => (dt.getFullYear() < 0 ? "BC" : "AD");

/**
 * @see https://docs.oracle.com/en/java/javase/15/docs/api/java.base/java/text/SimpleDateFormat.html
 */

const formatMap: { [key: string]: string | ((dt: Date) => number | string) } = {
    // Era designator (AD)
    G: G,
    GG: G,
    GGG: G,

    // Year (1996; 96)
    yy: "%y", // 18 = Two-digit year
    yyyy: "%Y", // 2018 = Four-digit year

    // Week year (2009; 09)
    YY: "%y", // 18 = Two-digit year
    YYYY: "%Y", // 2018 = Four-digit year

    // Month in year (context sensitive) (July; Jul; 07)
    M: "%-m", // 1-12 = The month, beginning at 1
    MM: "%m", // 01-12 = The month, 2-digits
    MMM: "%b", // Jan-Dec = The abbreviated month name
    MMMM: "%B", // January-December = The full month name

    // Month in year (standalone form) (July; Jul; 07)
    L: "%-m", // 1-12 = The month, beginning at 1
    LL: "%m", // 01-12 = The month, 2-digits
    LLL: "%b", // Jan-Dec = The abbreviated month name
    LLLL: "%B", // January-December = The full month name

    // Week in year (27)
    // w: "%W",

    // Week in month (2)
    // W: "-", // N/A

    // Day in year (189)
    // D: "%j",

    // Day in month (10)
    d: "%-d",
    dd: "%d",

    // Day of week in month (2)
    // F: "-", // N/A

    // Day name in week (Tuesday; Tue)
    E: "%a",
    EE: "%a",
    EEE: "%a",
    EEEE: "%A",

    // Day number of week (1 = Monday, ..., 7 = Sunday) (1)
    u: "%u",

    // Am/pm marker (PM)
    a: "%p",
    aa: "%p",
    aaa: "%p",

    // Hour in day (0-23) (0)
    H: "%-H",
    HH: "%H",

    // Hour in day (1-24) (24)
    k: "%-H",
    kk: "%H",

    // Hour in am/pm (0-11) (0)
    K: "%-I",
    KK: "%I",

    // Hour in am/pm (1-12) (12)
    h: "%-I",
    hh: "%I",

    // Minute in hour (30)
    m: "%-M",
    mm: "%M",

    // Second in minute (55)
    s: "%-S",
    ss: "%S",

    // Millisecond (978)
    S: "%-L",
    SSS: "%L",

    // Time zone (Pacific Standard Time; PST; GMT-08:00)
    z: "%:z",
    zz: "%:z",
    zzz: "%:z",
    zzzz: "%:z",

    // RFC 822 Time zone (-0800)
    Z: "%z", // +0800
    ZZ: "%z",
    ZZZ: "%z",

    // ISO 8601 Time Zone (-08; -0800; -08:00)
    X: "%:z",
    XX: "%:z",
    XXX: "%:z", // +08:00

    // escape
    "%": "%%",
};

const getFormatOptions = (type: string, dateStyle: string, timeStyle: string): Intl.DateTimeFormatOptions => {
    type = type?.toLowerCase() || "date";

    dateStyle ||= "medium";
    timeStyle ||= "medium";

    dateStyle = dateStyle.toLowerCase();
    timeStyle = timeStyle.toLowerCase();

    if (dateStyle === "default") dateStyle = "medium";
    if (timeStyle === "default") timeStyle = "medium";

    if (type === "date") timeStyle = null;
    if (type === "time") dateStyle = null;

    let options: Intl.DateTimeFormatOptions = {};
    if (timeStyle) options.timeStyle = timeStyle as any;
    if (dateStyle) options.dateStyle = dateStyle as any;

    return options;
};
