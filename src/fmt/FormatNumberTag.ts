import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";

/**
 * <fmt:formatNumber>
 * org.apache.taglibs.standard.tag.rt.fmt.FormatNumberTag
 *
 * @description
 * Formats a numeric value as a number, currency, or percentage
 */
export const formatNumberTag: NSP.TagFn<JstlFmt.FormatNumberTagAttr> = (_) => {
    return (_) => {
        throw new Error("Not implemented: <fmt:formatNumber>");
    };
};
