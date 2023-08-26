import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../../index.js";

type Properties = JstlFmt.Properties;

export const fmtBundleStore = (app: NSP.App, context: any) => {
    return app.store<Properties>(context, "fmt:bundle");
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

        let properties = await tag.app.process<Properties | Promise<Properties>>("fmt:bundle", basename);

        const store = fmtBundleStore(tag.app, context);

        if (prefix) properties = filter(properties, prefix);

        store.open(properties);

        const body = await tag.body(context);

        store.close();

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
