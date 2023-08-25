import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";
import {getChooseData} from "./ChooseTag.js";

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
        const {stack} = getChooseData(tag.app, context);

        // WHEN_OUTSIDE_CHOOSE
        if (!stack.length) {
            throw new Error(`<c:otherwise> must be inside <c:choose>`);
        }

        if (stack[0] !== true) {
            stack[0] = true;
            return tag.body(context);
        }
    }
};