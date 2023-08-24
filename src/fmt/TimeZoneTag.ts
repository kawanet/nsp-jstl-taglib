import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";

/**
 * <fmt:timeZone>
 * org.apache.taglibs.standard.tag.rt.fmt.TimeZoneTag
 *
 * @description
 * Specifies the time zone for any time formatting or parsing actions
 * nested in its body
 */
export const timeZoneTag: NSP.TagFn<JstlFmt.TimeZoneTagAttr> = (_) => {
    return (_) => {
        throw new Error("Not implemented: <fmt:timeZone>");
    };
};
