import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";
import {TimeZone} from "../lib/TimeZone.js";

const storeKey = "fmt:timeZone";

interface ParamData {
    stack: TimeZone[];
}

const initFn = (): ParamData => ({stack: []});

export const getSetTimeZoneData = (app: NSP.App, context: any) => {
    return app.store(context, storeKey, initFn);
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
        const {stack} = getSetTimeZoneData(tag.app, context);

        const {value} = tag.attr(context);
        if (!value) throw new Error(`<fmt:timeZoneTag> requires a "value" attribute`);

        const tz = TimeZone.getTimeZone(value);

        if (tz) stack.unshift(tz);
        const result = await tag.body(context);
        if (tz) stack.shift();

        return result;
    };
};
