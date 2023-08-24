import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";

/**
 * <fmt:setBundle>
 * org.apache.taglibs.standard.tag.rt.fmt.SetBundleTag
 *
 * @description
 * Loads a resource bundle and stores it in the named scoped variable or
 * the bundle configuration variable
 */
export const setBundleTag: NSP.TagFn<JstlFmt.SetBundleTagAttr> = (_) => {
    return (_) => {
        throw new Error("Not implemented: <fmt:setBundle>");
    };
};
