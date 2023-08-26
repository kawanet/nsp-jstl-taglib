import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../../index.js";

export const cParamStore = (app: NSP.App, context: any) => {
    return app.store<URLSearchParams>(context, "c:param");
};

/**
 * <c:param>
 * org.apache.taglibs.standard.tag.rt.core.ParamTag
 *
 * @description
 * Adds a parameter to a containing 'import' tag's URL.
 */
export const paramTag: NSP.TagFn<JstlC.ParamTagAttr> = (tag) => {
    return (context) => {
        const {name, value} = tag.attr(context);
        const params = cParamStore(tag.app, context).get();

        // PARAM_OUTSIDE_PARENT
        if (!params) {
            throw new Error("<c:param> must be nested inside <c:import> or <c:url> tag.");
        }

        params.set(name, value);
    };
};
