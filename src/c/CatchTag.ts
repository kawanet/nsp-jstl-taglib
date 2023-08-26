import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../../index.js";

const isPromise = <T>(v: any): v is Promise<T> => v && (typeof v.catch === "function");

/**
 * <c:catch>
 * org.apache.taglibs.standard.tag.common.core.CatchTag
 *
 * @description
 * Catches any Throwable that occurs in its body and optionally
 * exposes it.
 */

export const catchTag: NSP.TagFn<JstlC.CatchTagAttr> = (tag) => {
    return (context) => {
        const {var: varName} = tag.attr(context);

        const onCatch = (e: Error): undefined => {
            context[varName] = e;
        };

        try {
            const result = tag.body(context);
            if (isPromise(result)) {
                return result.catch(onCatch);
            } else {
                return result;
            }
        } catch (e) {
            return onCatch(e);
        }
    };
};
