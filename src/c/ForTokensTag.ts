import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../../index.js";
import {LoopStatus} from "../util/LoopStatus.js";

/**
 * <c:forTokens>
 * org.apache.taglibs.standard.tag.rt.core.ForTokensTag
 *
 * @description
 * Iterates over tokens, separated by the supplied delimeters
 */

export const forTokensTag: NSP.TagFn<JstlC.ForTokensTagAttr> = (tag) => {
    return async (context) => {
        const attr = tag.attr(context);

        const items = attr.items?.split(attr.delims);
        if (!items.length) return;

        const {begin, end, step, varStatus} = attr;
        const varName = attr.var;

        const status = new LoopStatus({items, begin, end, step});
        if (varStatus) context[varStatus] = status;

        const results: (string | Promise<string>)[] = [];

        while (!status.isLast()) {
            const item = status.next();
            if (varName) context[varName] = item;
            const result = await tag.body(context);
            results.push(result);
        }

        return tag.app.concat(results);
    };
};
