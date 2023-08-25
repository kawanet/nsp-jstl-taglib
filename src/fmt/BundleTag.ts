import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";
import {getMessageData} from "./MessageTag.js";

type Properties = JstlFmt.Properties;

/**
 * <fmt:bundle>
 * org.apache.taglibs.standard.tag.rt.fmt.BundleTag
 *
 * @description
 * Loads a resource bundle to be used by its tag body
 *
 * @example
 * <fmt:bundle basename="messages"/>
 * <fmt:message key="key"/>
 * </fmt:bundle>
 */
export const bundleTag: NSP.TagFn<JstlFmt.BundleTagAttr> = (tag) => {
    return (context) => {
        const {basename, prefix} = tag.attr(context);

        let properties = tag.app.process<Properties>("fmt:bundle", basename);

        const {stack} = getMessageData(tag.app, context);

        if (prefix) properties = filter(properties, prefix);

        stack.unshift(properties);

        const body = tag.body(context);

        stack.shift();

        return body;
    };
};

const filter = (properties: Properties, prefix: string) => {
    const result: Properties = {};

    const prefixLength = prefix.length;

    Object.keys(properties).forEach(key => {
        if (key.startsWith(prefix)) {
            const shortKey = key.substring(prefixLength);
            result[shortKey] = properties[key];
        }
    });

    return result;
};
