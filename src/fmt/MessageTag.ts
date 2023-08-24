import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";
import {getParamData} from "./ParamTag.js";

type Properties = JstlFmt.Properties;

const storeKey = "fmt:message";

interface MessageData {
    stack: Properties[];
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
        const {key, bundle, var: varName} = tag.attr(context);
        let message: string;

        if (bundle) {
            /**
             * @example
             * <fmt:setBundle basename="bundled" var="bundled"/>
             * <fmt:message key="key" bundle="${bundled}"/>
             */
            message = bundle[key];
        } else if (varName) {
            /**
             * @example
             * <fmt:setBundle basename="messages" var="bundled"/>
             * <fmt:message key="key" var="bundled"/>
             */
            const properties = context[varName];
            if (!properties) throw new Error(`Properties not set at "${varName}"`);
            message = properties[key];
        } else {
            /**
             * @example
             * <fmt:bundle basename="messages"/>
             * <fmt:message key="key"/>
             * </fmt:bundle>
             */
            const {stack} = getMessageData(tag.app, context);
            if (!stack.length) throw new Error("Properties not set at <fmt:bundle> tag.");

            for (const properties of stack) {
                if (properties[key] != null) {
                    message = properties[key];
                    break;
                }
            }
        }

        const {stack} = getParamData(tag.app, context);
        stack.unshift([]);

        await tag.body(context);

        const params = stack.shift();

        if (message && params.length) {
            message = message.replace(/\{(\d+)}/g, (_, $1) => (params[+$1] ?? ""));
        }

        return message;
    };
};
