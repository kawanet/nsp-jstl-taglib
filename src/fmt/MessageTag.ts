import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";

/**
 * <fmt:message>
 * org.apache.taglibs.standard.tag.rt.fmt.MessageTag
 *
 * @description
 * Maps key to localized message and performs parametric replacement
 */
export const messageTag: NSP.TagFn<JstlFmt.MessageTagAttr> = (_) => {
    return (_) => {
        throw new Error("Not implemented: <fmt:message>");
    };
};
