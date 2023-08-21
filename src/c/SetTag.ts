/**
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/rt/core/SetTag.java
 */

import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";

/**
 * <c:set var="${var}" value="${value}"/>
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
