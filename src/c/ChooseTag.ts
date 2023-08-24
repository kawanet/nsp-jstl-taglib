/**
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/common/core/ChooseTag.java
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/rt/core/WhenTag.java
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/common/core/OtherwiseTag.java
 */

import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";

const enum s {
    START = 1,
    DONE = 2,
}

interface Data {
    stack: s[];
}

const storeKey = "c:choose";

const initFn = (): Data => ({stack: []});

const isTrue = (value: any) => (!!value && value !== "false");

/**
 * <c:choose><c:when test=""></c:when><c:otherwise></c:otherwise></c:choose>
 */
export const chooseTag: NSP.TagFn<JstlC.ChooseTagAttr> = tag => {
    return context => {
        const {stack} = tag.app.store(context, storeKey, initFn);
        stack.unshift(s.START);
        const result = tag.body(context);
        stack.shift();
        return result;
    };
};

export const whenTag: NSP.TagFn<JstlC.WhenTagAttr> = tag => {
    return context => {
        const {stack} = tag.app.store(context, storeKey, initFn);
        if (!stack.length) {
            throw new Error(`<c:when> must be inside <c:choose>`);
        }

        if (stack[0] !== s.DONE) {
            const {test} = tag.attr(context);
            if (isTrue(test)) {
                stack[0] = s.DONE;
                return tag.body(context);
            }
        }
    }
};

export const otherwiseTag: NSP.TagFn<JstlC.OtherwiseTagAttr> = tag => {
    return context => {
        const {stack} = tag.app.store(context, storeKey, initFn);
        if (!stack.length) {
            throw new Error(`<c:otherwise> must be inside <c:choose>`);
        }

        if (stack[0] !== s.DONE) {
            stack[0] = s.DONE;
            return tag.body(context);
        }
    }
};
