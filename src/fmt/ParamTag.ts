import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";

/**
 * <fmt:param>
 * org.apache.taglibs.standard.tag.rt.fmt.ParamTag
 *
 * @description
 * Supplies an argument for parametric replacement to a containing
 * <message> tag
 */
export const paramTag: NSP.TagFn<JstlFmt.ParamTagAttr> = (_) => {
    return (_) => {
        throw new Error("Not implemented: <fmt:param>");
    };
};
