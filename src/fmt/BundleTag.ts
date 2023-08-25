import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";

type Properties = JstlFmt.Properties;

const storeKey = "fmt:bundle";

interface BundleData {
    stack: Properties[];
}

const initFn = (): BundleData => ({stack: []});

export const getBundleData = (app: NSP.App, context: any) => {
    return app.store(context, storeKey, initFn);
};

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
    return async (context) => {
        const {basename, prefix} = tag.attr(context);

        let properties = tag.app.process<Properties>("fmt:bundle", basename);

        const {stack} = getBundleData(tag.app, context);

        if (prefix) properties = filter(properties, prefix);

        stack.unshift(properties);

        const body = await tag.body(context);

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
