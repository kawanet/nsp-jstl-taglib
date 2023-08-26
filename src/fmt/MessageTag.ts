import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../../index.js";
import {fmtBundleStore} from "./BundleTag.js";
import {fmtParamStore} from "./ParamTag.js";

const UNDEFINED_KEY = "???";

/**
 * <fmt:message>
 * org.apache.taglibs.standard.tag.rt.fmt.MessageTag
 *
 * @description
 * Maps key to localized message and performs parametric replacement
 */
export const messageTag: NSP.TagFn<JstlFmt.MessageTagAttr> = (tag) => {
    return async (context) => {
        const attr = tag.attr(context);
        const {bundle, var: varName} = attr;

        const store = fmtParamStore(tag.app, context);
        store.open([]);
        const body = await tag.body(context);
        const params = store.close();

        // refer body as key if not specified
        const key = attr.key || body?.trim();
        let message: string = UNDEFINED_KEY + key + UNDEFINED_KEY;

        if (bundle) {
            /**
             * @example
             * <fmt:setBundle basename="bundled" var="bundled"/>
             * <fmt:message key="key" bundle="${bundled}"/>
             */
            if (key in bundle) {
                message = bundle[key];
            }
        } else if (varName) {
            /**
             * @example
             * <fmt:setBundle basename="messages" var="bundled"/>
             * <fmt:message key="key" var="bundled"/>
             */
            const properties = context[varName];
            if (properties && key in properties) {
                message = properties[key];
            }
        } else {
            /**
             * @example
             * <fmt:bundle basename="messages"/>
             * <fmt:message key="key"/>
             * </fmt:bundle>
             */
            const store = fmtBundleStore(tag.app, context);
            const properties = store.find(prop => (key in prop));
            if (properties) {
                message = properties[key];
            }
        }

        if (message && params.length) {
            message = message.replace(/\{(\d+)}/g, (_, $1) => (params[+$1] ?? ""));
        }

        return message;
    };
};
