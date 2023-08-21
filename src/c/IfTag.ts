/**
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/rt/core/IfTag.java
 */

import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";

const isTrue = (value: any) => (!!value && value !== "false");

/**
 * <c:if test="${test}">
 */
export const ifTag: NSP.TagFn<JstlC.IfTagAttr> = tag => {
    return context => {
        const {test} = tag.attr(context);

        if (isTrue(test)) {
            return tag.body(context);
        } else {
            return "";
        }
    };
};
