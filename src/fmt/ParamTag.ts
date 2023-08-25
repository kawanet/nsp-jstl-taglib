import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";
import {getMessageStore} from "./MessageTag.js";

/**
 * <fmt:param>
 * org.apache.taglibs.standard.tag.rt.fmt.ParamTag
 *
 * @description
 * Supplies an argument for parametric replacement to a containing
 * <message> tag
 */
export const paramTag: NSP.TagFn<JstlFmt.ParamTagAttr> = (tag) => {
    return (context) => {
        const {value} = tag.attr(context);
        const store = getMessageStore(tag.app, context);
        const params = store.current();

        // PARAM_OUTSIDE_MESSAGE
        if (!params) {
            throw new Error("<fmt:param> tag must be nested in <fmt:message> tag.");
        }

        params.push(value);

        return tag.body(context);
    };
};
