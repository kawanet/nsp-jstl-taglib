import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";
import {StackStore} from "../lib/StackStore.js";

interface SetLocaleData {
    locale?: string;
    variant?: string;
}

export const getSetLocaleStore = (app: NSP.App, context: any) => {
    return app.store(context, "fmt:setLocale", () => new StackStore<SetLocaleData>());
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
        const store = getSetLocaleStore(tag.app, context);
        const {value, variant} = tag.attr(context);
        store.open({locale: value, variant});
    };
};
