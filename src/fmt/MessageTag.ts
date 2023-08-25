import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";
import {getBundleData} from "./BundleTag.js";

const UNDEFINED_KEY = "???";

const storeKey = "fmt:message";

interface MessageData {
    stack: string[][];
}

const initFn = (): MessageData => ({stack: []});

export const getMessageData = (app: NSP.App, context: any) => {
    return app.store(context, storeKey, initFn);
};

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

        const {stack} = getMessageData(tag.app, context);
        stack.unshift([]);
        const body = await tag.body(context);
        const params = stack.shift();

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
            const {stack} = getBundleData(tag.app, context);
            if (stack) {
                for (const properties of stack) {
                    if (key in properties) {
                        message = properties[key];
                        break;
                    }
                }
            }
        }

        if (message && params.length) {
            message = message.replace(/\{(\d+)}/g, (_, $1) => (params[+$1] ?? ""));
        }

        return message;
    };
};
