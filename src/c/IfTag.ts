/**
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/rt/core/IfTag.java
 */

import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../../index.js";

const isTrue = (v: any): v is true => (!!v && v !== "false");

/**
 * <c:if>
 * org.apache.taglibs.standard.tag.rt.core.IfTag
 *
 * @description
 * Simple conditional tag, which evalutes its body if the
 * supplied condition is true and optionally exposes a Boolean
 * scripting variable representing the evaluation of this condition
 */
export const ifTag: NSP.TagFn<JstlC.IfTagAttr> = tag => {
    return context => {
        const {test, var: varName} = tag.attr(context);

        const result = isTrue(test);
        if (varName) {
            context[varName] = result;
        }

        if (result) {
            return tag.body(context);
        } else {
            return "";
        }
    };
};
