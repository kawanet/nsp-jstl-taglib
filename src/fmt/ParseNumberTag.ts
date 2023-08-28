import type {NSP} from "nsp-server-pages";
import type {JstlFmt} from "../../index.js";

const isTrue = (v: any): v is true => (!!v && v !== "false");

/**
 * <fmt:parseNumber>
 * org.apache.taglibs.standard.tag.rt.fmt.ParseNumberTag
 *
 * @description
 * Parses the string representation of a number, currency, or percentage
 */
export const parseNumberTag: NSP.TagFn<JstlFmt.ParseNumberTagAttr> = (tag) => {
    return (context) => {
        const {value, var: varName, type, integerOnly} = tag.attr(context);
        if (value == null || value === "") return;

        let number = Number(String(value)?.replace(/[^0-9.]/g, ""));
        if (isNaN(number)) return;

        if (type?.toLowerCase() === "percent") {
            number /= 100;
        }

        if (isTrue(integerOnly)) {
            number = Math.floor(number);
        }

        if (varName) {
            context[varName] = number;
        } else {
            return String(number);
        }
    };
};
