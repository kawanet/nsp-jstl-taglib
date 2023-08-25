import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";

const storeKey = "fmt:setLocale";

interface SetLocaleData {
    locale?: string;
    variant?: string;
}

const initFn = (): SetLocaleData => ({});

export const getSetLocaleData = (app: NSP.App, context: any) => {
    return app.store(context, storeKey, initFn);
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
        const data = getSetLocaleData(tag.app, context);
        const {value, variant} = tag.attr(context);
        data.locale = value;
        data.variant = variant;
    };
};
