import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";
import {StackStore} from "../lib/StackStore.js";

export const cParamStore = (app: NSP.App, context: any) => {
    return app.store(context, "c:param", () => new StackStore<URLSearchParams>());
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
        const store = cParamStore(tag.app, context);
        const params = store.current();

        // PARAM_OUTSIDE_PARENT
        if (!params) {
            throw new Error("<c:param> must be nested inside <c:import> or <c:url> tag.");
        }

        params.set(name, value);
    };
};
