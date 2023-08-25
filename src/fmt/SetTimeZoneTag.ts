import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";
import {TimeZone} from "../lib/TimeZone.js";

/**
 * <fmt:setTimeZone>
 * org.apache.taglibs.standard.tag.rt.fmt.SetTimeZoneTag
 *
 * @description
 * Stores the given time zone in the time zone configuration variable
 */
export const setTimeZoneTag: NSP.TagFn<JstlFmt.SetTimeZoneTagAttr> = (tag) => {
    return (context) => {
        const {value, var: varName} = tag.attr(context);

        let tz: TimeZone;
        if (value) {
            tz = TimeZone.getTimeZone(value);
        } else {
            tz = TimeZone.getTimeZone("GMT");
        }

        context[varName] = tz;
    };
};
