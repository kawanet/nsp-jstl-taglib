/**
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/rt/core/SetTag.java
 */

import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../../index.js";

/**
 * <c:set>
 * org.apache.taglibs.standard.tag.rt.core.SetTag
 *
 * @description
 * Sets the result of an expression evaluation in a 'scope'
 */
export const setTag: NSP.TagFn<JstlC.SetTagAttr> = tag => {
    return context => {
        const attr = tag.attr(context);
        const key = attr.var;
        const {value} = attr;

        (context as any)[key] = value;

        return "";
    };
};
