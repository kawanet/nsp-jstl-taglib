import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../../index.js";
import {LoopStatus} from "../util/LoopStatus.js";

/**
 * <c:forEach>
 * org.apache.taglibs.standard.tag.rt.core.ForEachTag
 *
 * @description
 * The basic iteration tag, accepting many different
 * collection types and supporting subsetting and other
 * functionality
 */

export const forEachTag: NSP.TagFn<JstlC.ForEachTagAttr> = (tag) => {
    return async (context: any) => {
        const attr = tag.attr(context);

        const {items, begin, end, step, varStatus} = attr;
        if (!items?.length) return;

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
