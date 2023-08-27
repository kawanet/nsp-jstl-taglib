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
 *
 * Note:
 * - not supported: `maxIntegerDigits`, `currencySymbol` attributes
 */
export const formatNumberTag: NSP.TagFn<JstlFmt.FormatNumberTagAttr> = (tag) => {
    return async (context) => {
        const {value, type, maxFractionDigits, minFractionDigits, minIntegerDigits, var: varName, currencyCode} = tag.attr(context);

        const store = fmtSetLocaleStore(tag.app, context);
        const locale = store.get()?.getLanguage();
        const locales = [locale];

        const tyleL = type?.toLowerCase();
        const style = typeToStyle[tyleL] || tyleL;

        const options: Intl.NumberFormatOptions = {};
        if (style) options.style = style;
        if (currencyCode) options.currency = currencyCode;
        if (+minFractionDigits) options.minimumFractionDigits = +minFractionDigits;
        if (+maxFractionDigits) options.maximumFractionDigits = +maxFractionDigits;
        if (+minIntegerDigits) options.minimumIntegerDigits = +minIntegerDigits;

        // if value is specified, body is not evaluated
        const input = value ?? await tag.body(context);

        const result = new Intl.NumberFormat(locales, options).format(+input);

        if (varName) {
            context[varName] = result;
        } else {
            return result;
        }
    };
};
