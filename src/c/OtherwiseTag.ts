import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../../index.js";
import {cChooseStore} from "./ChooseTag.js";

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
    return async (context) => {
        const store = cChooseStore(tag.app, context);
        const status = store.get();

        // WHEN_OUTSIDE_CHOOSE
        if (!status == null) {
            throw new Error(`<c:otherwise> must be inside <c:choose>`);
        }

        // true means done. false means not yet.
        if (status !== true) {
            store.set(true);
            store.open();
            const body = await tag.body(context);
            store.close();
            return body;
        }
    }
};
