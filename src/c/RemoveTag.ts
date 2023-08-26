import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../../index.js";

/**
 * <c:remove>
 * org.apache.taglibs.standard.tag.common.core.RemoveTag
 *
 * @description
 * Removes a scoped variable (from a particular scope, if specified).
 */
export const removeTag: NSP.TagFn<JstlC.RemoveTagAttr> = (tag) => {
    return (context) => {
        const {var: varName} = tag.attr(context);
        if (varName == null) return;
        delete context[varName];
    };
};
