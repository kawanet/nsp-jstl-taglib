import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";
import {getChooseStore} from "./ChooseTag.js";

/**
 * <c:otherwise>
 * org.apache.taglibs.standard.tag.common.core.OtherwiseTag
 *
 * @description
 * Subtag of <choose> that follows <when> tags
 * and runs only if all of the prior conditions evaluated to
 * 'false'
 */
export const otherwiseTag: NSP.TagFn<JstlC.OtherwiseTagAttr> = (tag) => {
    return (context) => {
        const store = getChooseStore(tag.app, context);
        const status = store.current();

        // WHEN_OUTSIDE_CHOOSE
        if (!status == null) {
            throw new Error(`<c:otherwise> must be inside <c:choose>`);
        }

        // true means done. false means not yet.
        if (status !== true) {
            store.current(true);
            return tag.body(context);
        }
    }
};
