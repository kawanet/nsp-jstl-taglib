import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../../index.js";
import {fmtSetLocaleStore} from "./SetLocaleTag.js";

const typeToStyle: { [type: string]: string } = {
    number: "decimal"
};

/**
 * <fmt:formatNumber>
 * org.apache.taglibs.standard.tag.rt.fmt.FormatNumberTag
 *
 * @description
 * Formats a numeric value as a number, currency, or percentage
 */
export const formatNumberTag: NSP.TagFn<JstlFmt.FormatNumberTagAttr> = (tag) => {
    return async (context) => {
        const {value, type, pattern, var: varName, currencyCode} = tag.attr(context);
        let {maxFractionDigits, minFractionDigits, minIntegerDigits} = tag.attr(context);

        const store = fmtSetLocaleStore(tag.app, context);
        const locale = store.get()?.getLanguage();

        const tyleL = type?.toLowerCase();
        const style = typeToStyle[tyleL] || tyleL;

        if (/\.#/.test(pattern)) {
            maxFractionDigits = pattern.replace(/^.*\./s, "").replace(/[^#]/g, "").length;
        }

        const options: Intl.NumberFormatOptions = {};
        if (style) options.style = style;
        if (currencyCode) options.currency = currencyCode;
        if (+minFractionDigits) options.minimumFractionDigits = +minFractionDigits;
        if (+maxFractionDigits) options.maximumFractionDigits = +maxFractionDigits;
        if (+minIntegerDigits) options.minimumIntegerDigits = +minIntegerDigits;

        // if value is specified, body is not evaluated
        const input = value ?? await tag.body(context);

        const result = new Intl.NumberFormat(locale, options).format(+input);

        if (varName) {
            context[varName] = result;
        } else {
            return result;
        }
    };
};
