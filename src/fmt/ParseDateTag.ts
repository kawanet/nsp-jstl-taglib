import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";

/**
 * <fmt:parseDate>
 * org.apache.taglibs.standard.tag.rt.fmt.ParseDateTag
 *
 * @description
 * Parses the string representation of a date and/or time
 */
export const parseDateTag: NSP.TagFn<JstlFmt.ParseDateTagAttr> = (_) => {
    return (_) => {
        throw new Error("Not implemented: <fmt:parseDate>");
    };
};
