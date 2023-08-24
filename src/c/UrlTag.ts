import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";

/**
 * <c:url>
 * org.apache.taglibs.standard.tag.rt.core.UrlTag
 *
 * @description
 * Creates a URL with optional query parameters.
 */

export const urlTag: NSP.TagFn<JstlC.UrlTagAttr> = _ => {
    return _ => {
        throw new Error("Not implemented: <c:url>");
    };
};
