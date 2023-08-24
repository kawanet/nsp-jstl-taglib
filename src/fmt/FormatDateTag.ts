import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";

/**
 * <fmt:formatDate>
 * org.apache.taglibs.standard.tag.rt.fmt.FormatDateTag
 *
 * @description
 * Formats a date and/or time using the supplied styles and pattern
 */
export const formatDateTag: NSP.TagFn<JstlFmt.FormatDateTagAttr> = (_) => {
    return (_) => {
        throw new Error("Not implemented: <fmt:formatDate>");
    };
};
