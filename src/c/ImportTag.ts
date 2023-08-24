import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";

/**
 * <c:import>
 * org.apache.taglibs.standard.tag.rt.core.ImportTag
 *
 * @description
 * Retrieves an absolute or relative URL and exposes its contents
 * to either the page, a String in 'var', or a Reader in 'varReader'.
 */

export const importTag: NSP.TagFn<JstlC.ImportTagAttr> = _ => {
    return _ => {
        throw new Error("Not implemented: <c:import>");
    };
};

/**
 * <c:param>
 * org.apache.taglibs.standard.tag.rt.core.ParamTag
 *
 * @description
 * Adds a parameter to a containing 'import' tag's URL.
 */

export const paramTag: NSP.TagFn<JstlC.ParamTagAttr> = _ => {
    return _ => {
        throw new Error("Not implemented: <c:param>");
    };
};
