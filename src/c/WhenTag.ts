import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";
import {getChooseData} from "./ChooseTag.js";

const isTrue = (value: any) => (!!value && value !== "false");

/**
 * <c:when>
 * org.apache.taglibs.standard.tag.rt.core.WhenTag
 *
 * @description
 * Subtag of <choose> that includes its body if its
 * condition evalutes to 'true'
 */
export const whenTag: NSP.TagFn<JstlC.WhenTagAttr> = (tag) => {
    return (context) => {
        const {stack} = getChooseData(tag.app, context);

        // WHEN_OUTSIDE_CHOOSE
        if (!stack.length) {
            throw new Error(`<c:when> must be inside <c:choose>`);
        }

        if (stack[0] !== true) {
            const {test} = tag.attr(context);
            if (isTrue(test)) {
                stack[0] = true;
                return tag.body(context);
            }
        }
    }
};
