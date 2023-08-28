import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../../index.js";
import {ResourceBundle} from "../util/ResourceBundle.js";
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
        const varName = attr.var;
        const bundle = attr.bundle ?? context[varName];

        const store = fmtParamStore(tag.app, context);
        store.open([]);
        const body = await tag.body(context);
        const params = store.close();

        // refer body as key if not specified
        const key = attr.key || body?.trim();
        let message: string = UNDEFINED_KEY + key + UNDEFINED_KEY;

        if (bundle) {
            if (!ResourceBundle.isBundle(bundle)) {
                throw new Error("Invalid ResourceBundle: " + bundle);
            }
            /**
             * @example
             * <fmt:setBundle basename="bundled" var="bundled"/>
             * <fmt:message key="key" bundle="${bundled}"/>
             *
             * @example
             * <fmt:setBundle basename="messages" var="bundled"/>
             * <fmt:message key="key" var="bundled"/>
             */
            message = bundle.getString(key);
        } else {
            /**
             * @example
             * <fmt:bundle basename="messages"/>
             * <fmt:message key="key"/>
             * </fmt:bundle>
             */
            const store = fmtBundleStore(tag.app, context);

            store.find(bundle => {
                const {prefix} = bundle;
                message = bundle.resource.getString(prefix ? prefix + key : key);
                return (message != null);
            });
        }

        if (message && params.length) {
            message = message.replace(/\{(\d+)}/g, (_, $1) => (params[+$1] ?? ""));
        }

        return message;
    };
};
