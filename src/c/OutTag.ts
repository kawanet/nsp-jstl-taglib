/**
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/tag/rt/core/IfTag.java
 */

import type {NSP} from "nsp-server-pages";
import {$$} from "telesy";
import type {JstlC} from "../../index.js";

const isFalse = (v: any): v is false => (v === false || v === "false");

const isPromise = (v: any): v is Promise<any> => v && (typeof v.then === "function");

const isEmpty = (v: any): boolean => (v == null || v === "");

const trim = (v: string): string => (("string" === typeof v) ? v.trim() : v);

/**
 * <c:out>
 * org.apache.taglibs.standard.tag.rt.core.OutTag
 *
 * @description
 * Like <%= ... >, but for expressions.
 */
export const outTag: NSP.TagFn<JstlC.OutTagAttr> = tag => {
    return context => {
        const attr = tag.attr(context);
        const {value, escapeXml} = attr;

        const filter = (v: string) => (v != null && !isFalse(escapeXml)) ? $$(v) : v;

        const result = (v: string | Promise<string>) => isPromise(v) ? v.then(trim).then(filter) : filter(trim(v));

        if (!isEmpty(value)) return result(value);

        if (!isEmpty(attr.default)) return result(attr.default);

        return result(tag.body(context));
    };
};
