import type {NSP} from "nsp-server-pages";
import type {JstlFmt, JstlUtil} from "../../index.js";
import {TimeZone} from "../util/TimeZone.js";

export const fmtSetTimeZoneStore = (app: NSP.App, context: any) => {
    return app.store<JstlUtil.TimeZone>(context, "fmt:timeZone");
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
        const store = fmtSetTimeZoneStore(tag.app, context);
        const {value} = tag.attr(context);

        const tz = TimeZone.getTimeZone(value || "GMT");

        if (tz) store.open(tz);
        const result = await tag.body(context);
        if (tz) store.close();

        return result;
    };
};
