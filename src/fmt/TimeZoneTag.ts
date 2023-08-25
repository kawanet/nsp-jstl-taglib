import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";
import {TimeZone} from "../lib/TimeZone.js";
import {StackStore} from "../lib/StackStore.js";

export const getSetTimeZoneStore = (app: NSP.App, context: any) => {
    return app.store(context, "fmt:timeZone", () => new StackStore<JstlFmt.TimeZone>());
};

/**
 * <fmt:timeZone>
 * org.apache.taglibs.standard.tag.rt.fmt.TimeZoneTag
 *
 * @description
 * Specifies the time zone for any time formatting or parsing actions
 * nested in its body
 */
export const timeZoneTag: NSP.TagFn<JstlFmt.TimeZoneTagAttr> = (tag) => {
    return async (context) => {
        const store = getSetTimeZoneStore(tag.app, context);
        const {value} = tag.attr(context);

        const tz = TimeZone.getTimeZone(value || "GMT");

        if (tz) store.open(tz);
        const result = await tag.body(context);
        if (tz) store.close();

        return result;
    };
};
