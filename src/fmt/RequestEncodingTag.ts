import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../../index.js";

/**
 * <fmt:requestEncoding>
 * org.apache.taglibs.standard.tag.rt.fmt.RequestEncodingTag
 *
 * @description
 * Sets the request character encoding
 */
export const requestEncodingTag: NSP.TagFn<JstlFmt.RequestEncodingTagAttr> = (_) => {
    return (_) => {
        throw new Error("Not implemented: <fmt:requestEncoding>");
    };
};
