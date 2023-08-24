import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";

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
    return (context) => {
        const attr = tag.attr(context);

        const items = attr.items;
        if (!items?.length) return;

        const begin = +attr.begin || 0;
        const end = +attr.end || items.length - 1;
        const step = +attr.step || 1;
        const varName = attr.var;

        const results: (string | Promise<string>)[] = [];

        for (let i = begin; i <= end; i += step) {
            context[varName] = items[i];
            const result = tag.body(context);
            results.push(result);
        }

        return tag.app.concat(results);
    };
};
