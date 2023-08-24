import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";

const storeKey = "c:param";

interface ParamData {
    stack: URLSearchParams[];
}

const initFn = (): ParamData => ({stack: []});

export const getParamData = (app: NSP.App, context: any) => {
    return app.store(context, storeKey, initFn);
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
        const {stack} = getParamData(tag.app, context);
        const params = stack.at(0);

        if (!params) throw new Error("<c:param> must be nested inside <c:import> or <c:url> tag.");

        params.set(name, value);
    };
};
