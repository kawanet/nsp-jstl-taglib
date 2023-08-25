/**
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/common/core/ChooseTag.java
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/rt/core/WhenTag.java
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/common/core/OtherwiseTag.java
 */

import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";
import {StackStore} from "../lib/StackStore.js";

export const getChooseStore = (app: NSP.App, context: any) => {
    return app.store(context, "c:choose", () => new StackStore<boolean>());
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
    return async (context) => {
        const store = getChooseStore(tag.app, context);

        // true means done. false means not yet.
        store.open(false);
        const result = await tag.body(context);
        store.close();

        return result;
    };
};
