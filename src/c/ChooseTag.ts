/**
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/common/core/ChooseTag.java
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/rt/core/WhenTag.java
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/common/core/OtherwiseTag.java
 */

import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";

interface ChooseData {
    // true means done. false means not yet.
    stack: boolean[];
}

const storeKey = "c:choose";

const initFn = (): ChooseData => ({stack: []});

export const getChooseData = (app: NSP.App, context: any) => {
    return app.store(context, storeKey, initFn);
};

/**
 * <c:choose>
 * org.apache.taglibs.standard.tag.common.core.ChooseTag
 *
 * @description
 * Simple conditional tag that establishes a context for
 * mutually exclusive conditional operations, marked by
 * <when> and <otherwise>
 */
export const chooseTag: NSP.TagFn<JstlC.ChooseTagAttr> = (tag) => {
    return (context) => {
        const {stack} = getChooseData(tag.app, context);
        stack.unshift(false);
        const result = tag.body(context);
        stack.shift();
        return result;
    };
};
