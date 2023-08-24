import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";

/**
 * <fmt:setTimeZone>
 * org.apache.taglibs.standard.tag.rt.fmt.SetTimeZoneTag
 *
 * @description
 * Stores the given time zone in the time zone configuration variable
 */
export const setTimeZoneTag: NSP.TagFn<JstlFmt.SetTimeZoneTagAttr> = (_) => {
    return (_) => {
        throw new Error("Not implemented: <fmt:setTimeZone>");
    };
};
