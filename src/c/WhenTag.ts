import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../../index.js";
import {cChooseStore} from "./ChooseTag.js";

const isTrue = (v: any): v is true => (!!v && v !== "false");

/**
 * <c:when>
 * org.apache.taglibs.standard.tag.rt.core.WhenTag
 *
 * @description
 * Subtag of <choose> that includes its body if its
 * condition evaluates to 'true'
 */
export const whenTag: NSP.TagFn<JstlC.WhenTagAttr> = (tag) => {
    return async (context) => {
        const store = cChooseStore(tag.app, context);
        const status = store.get();

        // WHEN_OUTSIDE_CHOOSE
        if (status == null) {
            throw new Error(`<c:when> must be inside <c:choose>`);
        }

        if (status !== true) {
            const {test} = tag.attr(context);
            if (isTrue(test)) {
                store.set(true);
                store.open();
                const body = await tag.body(context);
                store.close();
                return body;
            }
        }
    }
};
