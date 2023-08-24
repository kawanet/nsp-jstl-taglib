import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../index.js";

const storeKey = "fmt:param";

interface ParamData {
    stack: string[][];
}

const initFn = (): ParamData => ({stack: []});

export const getParamData = (app: NSP.App, context: any) => {
    return app.store(context, storeKey, initFn);
};

/**
 * <fmt:param>
 * org.apache.taglibs.standard.tag.rt.fmt.ParamTag
 *
 * @description
 * Supplies an argument for parametric replacement to a containing
 * <message> tag
 */
export const paramTag: NSP.TagFn<JstlFmt.ParamTagAttr> = (tag) => {
    return (context) => {
        const {value} = tag.attr(context);
        const {stack} = getParamData(tag.app, context);
        if (!stack.length) throw new Error("<fmt:param> tag must be nested in <fmt:message> tag.");

        const params = stack.at(0);
        params.push(value);

        return tag.body(context);
    };
};
