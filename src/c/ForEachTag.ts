import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../../index.js";
import {getLoopStatus, loopStatusStore} from "../util/LoopStatus.js";

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

        const status = getLoopStatus({items, begin, end, step});
        if (varStatus) context[varStatus] = status;

        const store = loopStatusStore(tag.app, context);
        store.open(status);

        const results: (string | Promise<string>)[] = [];

        while (!status.isLast()) {
            const item = status.next();
            if (varName) context[varName] = item;
            const result = await tag.body(context);
            results.push(result);
        }

        store.close();

        return tag.app.concat(results);
    };
};
