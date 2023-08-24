import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";

/**
 * <fmt:setLocale>
 * org.apache.taglibs.standard.tag.rt.fmt.SetLocaleTag
 *
 * @description
 * Stores the given locale in the locale configuration variable
 */
export const setLocaleTag: NSP.TagFn<JstlFmt.SetLocaleTagAttr> = (_) => {
    return (_) => {
        throw new Error("Not implemented: <fmt:setLocale>");
    };
};
