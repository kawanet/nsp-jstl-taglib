import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../../index.js";
import {Locale} from "../util/Locale.js";

export const fmtSetLocaleStore = (app: NSP.App, context: any) => {
    return app.store<Locale>(context, "fmt:setLocale");
};

/**
 * <fmt:setLocale>
 * org.apache.taglibs.standard.tag.rt.fmt.SetLocaleTag
 *
 * @description
 * Stores the given locale in the locale configuration variable
 */
export const setLocaleTag: NSP.TagFn<JstlFmt.SetLocaleTagAttr> = (tag) => {
    return (context) => {
        const store = fmtSetLocaleStore(tag.app, context);
        const {value, variant} = tag.attr(context);
        store.set(new Locale(value, null, variant));
    };
};
