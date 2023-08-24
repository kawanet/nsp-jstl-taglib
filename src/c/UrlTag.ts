import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";
import {getParamData} from "./ParamTag.js";

/**
 * <c:url>
 * org.apache.taglibs.standard.tag.rt.core.UrlTag
 *
 * @description
 * Creates a URL with optional query parameters.
 */

export const urlTag: NSP.TagFn<JstlC.UrlTagAttr> = (tag) => {
    return async (context) => {
        const {stack} = getParamData(tag.app, context);
        const attr = tag.attr(context);
        const varName = attr.var;

        let url = attr.value || "";
        const defaultParams = /\?/.test(url) ? url.replace(/.*\?/, "") : "";
        url = url.replace(/\?.*/, "");

        const params = new URLSearchParams(defaultParams);
        stack.unshift(params);
        await tag.body(context);
        stack.shift();

        const newParams = params.toString();
        if (newParams) {
            url = url + "?" + newParams;
        }

        context[varName] = url;
    };
};