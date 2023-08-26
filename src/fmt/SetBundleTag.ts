import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../../index.js";
import {getBundle} from "./BundleTag.js";

/**
 * <fmt:setBundle>
 * org.apache.taglibs.standard.tag.rt.fmt.SetBundleTag
 *
 * @description
 * Loads a resource bundle and stores it in the named scoped variable or
 * the bundle configuration variable
 *
 * @example
 * <fmt:setBundle basename="bundled" var="bundled"/>
 * <fmt:message key="key" bundle="${bundled}"/>
 * <fmt:message key="key" var="bundled"/>
 */
export const setBundleTag: NSP.TagFn<JstlFmt.SetBundleTagAttr> = (tag) => {
    return async (context) => {
        const {basename, var: varName} = tag.attr(context);

        context[varName] = await getBundle(tag.app, basename, context);

        return tag.body(context);
    };
};
