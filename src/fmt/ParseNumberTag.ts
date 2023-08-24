import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";

/**
 * <fmt:parseNumber>
 * org.apache.taglibs.standard.tag.rt.fmt.ParseNumberTag
 *
 * @description
 * Parses the string representation of a number, currency, or percentage
 */
export const parseNumberTag: NSP.TagFn<JstlFmt.ParseNumberTagAttr> = (_) => {
    return (_) => {
        throw new Error("Not implemented: <fmt:parseNumber>");
    };
};
