import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";
import {getParamData} from "./ParamTag.js";

/**
 * <c:import>
 * org.apache.taglibs.standard.tag.rt.core.ImportTag
 *
 * @description
 * Retrieves an absolute or relative URL and exposes its contents
 * to either the page, a String in 'var', or a Reader in 'varReader'.
 */

export const importTag: NSP.TagFn<JstlC.ImportTagAttr> = (tag) => {
    return async (context) => {
        const data = getParamData(tag.app, context);
        const attr = tag.attr(context);
        const varName = attr.var;

        let url = attr.url || "";
        const defaultParams = /\?/.test(url) ? url.replace(/.*\?/, "") : "";
        url = url.replace(/\?.*/, "");

        const params = data.params = new URLSearchParams(defaultParams);
        await tag.body(context);
        delete data.params;

        const newParams = params.toString();
        if (newParams) {
            url = url + "?" + newParams;
        }

        const render = await tag.app.load(url);
        const result = await render({});

        if (varName) {
            context[varName] = result;
        } else {
            return result;
        }
    };
};
