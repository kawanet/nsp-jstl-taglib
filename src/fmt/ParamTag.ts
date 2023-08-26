import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../../index.js";

export const fmtParamStore = (app: NSP.App, context: any) => {
    return app.store<string[]>(context, "fmt:param");
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
        const params = fmtParamStore(tag.app, context).get();

        // PARAM_OUTSIDE_MESSAGE
        if (!params) {
            throw new Error("<fmt:param> tag must be nested in <fmt:message> tag.");
        }

        params.push(value);

        return tag.body(context);
    };
};
