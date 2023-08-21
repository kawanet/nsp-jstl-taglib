/**
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/rt/core/IfTag.java
 */

import type {NSP} from "nsp-server-pages";
import {$$} from "telesy";
import type {JstlC} from "../index.js";

const isFalse = (value: any) => (value === false || value === "false");

export const outTag: NSP.TagFn<JstlC.OutTagAttr> = tag => {
    return context => {
        const attr = tag.attr(context);
        const {value, escapeXml} = attr;
        const out = value ?? attr.default ?? "";

        // default is true
        return isFalse(escapeXml) ? out : $$(out);
    };
};
