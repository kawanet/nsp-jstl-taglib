import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";

/**
 * <c:redirect>
 * org.apache.taglibs.standard.tag.rt.core.RedirectTag
 *
 * @description
 * Redirects to a new URL.
 */
export const redirectTag: NSP.TagFn<JstlC.RedirectTagAttr> = _ => {
    return _ => {
        throw new Error("Not implemented: <c:redirect>");
    };
};
