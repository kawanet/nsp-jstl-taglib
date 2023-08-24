import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";

/**
 * <c:forTokens>
 * org.apache.taglibs.standard.tag.rt.core.ForTokensTag
 *
 * @description
 * Iterates over tokens, separated by the supplied delimeters
 */

export const forTokensTag: NSP.TagFn<JstlC.ForTokensTagAttr> = _ => {
    return _ => {
        throw new Error("Not implemented: <c:forTokens>");
    };
};
