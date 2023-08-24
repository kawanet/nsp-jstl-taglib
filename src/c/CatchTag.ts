import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";

/**
 * <c:catch>
 * org.apache.taglibs.standard.tag.common.core.CatchTag
 *
 * @description
 * Catches any Throwable that occurs in its body and optionally
 * exposes it.
 */

export const catchTag: NSP.TagFn<JstlC.CatchTagAttr> = _ => {
    return _ => {
        throw new Error("Not implemented: <c:catch>");
    };
};
