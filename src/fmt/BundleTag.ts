import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../../index.js";
import {ResourceBundle} from "../lib/ResourceBundle.js";
import {fmtSetLocaleStore} from "./SetLocaleTag.js";

interface Bundle {
    resource: JstlFmt.ResourceBundle;
    prefix?: string;
}

export const fmtBundleStore = (app: NSP.App, context: any) => {
    return app.store<Bundle>(context, "fmt:bundle");
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
        const {app} = tag;

        const {basename, prefix} = tag.attr(context);

        const locale = fmtSetLocaleStore(app, context).get();

        const resource = await ResourceBundle.getBundle(basename, locale, app);

        const store = fmtBundleStore(app, context);

        store.open({resource, prefix});

        const body = await tag.body(context);

        store.close();

        return body;
    };
};
