import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";
import {getChooseData} from "./ChooseTag.js";

export const otherwiseTag: NSP.TagFn<JstlC.OtherwiseTagAttr> = (tag) => {
    return (context) => {
        const {stack} = getChooseData(tag.app, context);
        if (!stack.length) {
            throw new Error(`<c:otherwise> must be inside <c:choose>`);
        }

        if (stack[0] !== true) {
            stack[0] = true;
            return tag.body(context);
        }
    }
};