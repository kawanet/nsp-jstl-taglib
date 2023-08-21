/**
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/common/core/ChooseTag.java
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/rt/core/WhenTag.java
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/common/core/OtherwiseTag.java
 */

import type {NSP} from "nsp-server-pages";
import type {jstlC} from "../index.js";

const enum s {
    START = 1,
    DONE = 2,
}

interface Conf {
    key: string;
}

const getStack = (conf: Conf, context: any): number[] => {
    if (context == null) throw new Error(`null context not supported`);

    if (typeof context !== "object") throw new Error(`context must be an object`);

    const key = conf?.key || "#c:choose";

    return ((context as any)[key] || ((context as any)[key] = []));
};

const removeStack = (conf: Conf, context: any): void => {
    const key = conf?.key || "#c:choose";
    delete (context as any)[key];
};

const isTrue = (value: any) => (!!value && value !== "false");

/**
 * <c:choose><c:when test=""></c:when><c:otherwise></c:otherwise></c:choose>
 */
export const chooseTag: NSP.TagFn<jstlC.ChooseTagAttr> = tag => {
    return context => {
        const stack = getStack(tag.conf, context);
        stack.unshift(s.START);
        const result = tag.body(context);
        stack.shift();

        if (!stack.length) {
            removeStack(tag.conf, context);
        }

        return result;
    };
};

export const whenTag: NSP.TagFn<jstlC.WhenTagAttr> = tag => {
    return context => {
        const stack = getStack(tag.conf, context);
        if (!stack.length) {
            throw new Error(`WHEN_OUTSIDE_CHOOSE`);
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

export const otherwiseTag: NSP.TagFn<jstlC.OtherwiseTagAttr> = tag => {
    return context => {
        const stack = getStack(tag.conf, context);
        if (!stack.length) {
            throw new Error(`<c:otherwise> must be inside <c:choose>`);
        }

        if (stack[0] !== s.DONE) {
            stack[0] = s.DONE;
            return tag.body(context);
        }
    }
};
