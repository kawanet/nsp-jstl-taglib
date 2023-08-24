import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";

/**
 * <fmt:bundle>
 * org.apache.taglibs.standard.tag.rt.fmt.BundleTag
 *
 * @description
 * Loads a resource bundle to be used by its tag body
 */
export const bundleTag: NSP.TagFn<JstlFmt.BundleTagAttr> = (_) => {
    return (_) => {
        throw new Error("Not implemented: <fmt:bundle>");
    };
};
