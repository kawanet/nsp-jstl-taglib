import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";

/**
 * <c:forTokens>
 * org.apache.taglibs.standard.tag.rt.core.ForTokensTag
 *
 * @description
 * Iterates over tokens, separated by the supplied delimeters
 */

export const forTokensTag: NSP.TagFn<JstlC.ForTokensTagAttr> = (tag) => {
    return (context) => {
        const attr = tag.attr(context);

        const array = attr.items?.split(attr.delims);
        if (!array.length) return;

        const begin = +attr.begin || 0;
        const end = +attr.end || array.length - 1;
        const step = +attr.step || 1;
        const varName = attr.var;

        const results: (string | Promise<string>)[] = [];

        for (let i = begin; i <= end; i += step) {
            context[varName] = array[i];
            const result = tag.body(context);
            results.push(result);
        }

        return tag.app.concat(results);
    };
};
