import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";
import {StackStore} from "../lib/StackStore.js";

export const fmtParamStore = (app: NSP.App, context: any) => {
    return app.store(context, "fmt:message", () => new StackStore<string[]>());
};

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
        const store = fmtParamStore(tag.app, context);
        const params = store.current();

        // PARAM_OUTSIDE_MESSAGE
        if (!params) {
            throw new Error("<fmt:param> tag must be nested in <fmt:message> tag.");
        }

        params.push(value);

        return tag.body(context);
    };
};
