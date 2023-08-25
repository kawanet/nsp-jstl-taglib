import type {NSP} from "nsp-server-pages";

/**
 * fmt
 * uri: http://java.sun.com/jsp/jstl/fmt
 *
 * JSTL 1.1 i18n-capable formatting library
 */
export declare namespace JstlFmt {
    type fmtTags = {
        requestEncoding: NSP.TagFn<RequestEncodingTagAttr>;
        setLocale: NSP.TagFn<SetLocaleTagAttr>;
        timeZone: NSP.TagFn<TimeZoneTagAttr>;
        setTimeZone: NSP.TagFn<SetTimeZoneTagAttr>;
        bundle: NSP.TagFn<BundleTagAttr>;
        setBundle: NSP.TagFn<SetBundleTagAttr>;
        message: NSP.TagFn<MessageTagAttr>;
        param: NSP.TagFn<ParamTagAttr>;
        formatNumber: NSP.TagFn<FormatNumberTagAttr>;
        parseNumber: NSP.TagFn<ParseNumberTagAttr>;
        formatDate: NSP.TagFn<FormatDateTagAttr>;
        parseDate: NSP.TagFn<ParseDateTagAttr>;
    };

    type Properties = { [key: string]: any };

    interface TimeZone {
        getOffset(date: number | Date): number;
    }

    /**
     * <fmt:requestEncoding>
     * org.apache.taglibs.standard.tag.rt.fmt.RequestEncodingTag
     *
     * @description
     * Sets the request character encoding
     */
    interface RequestEncodingTagAttr {
        /**
         * Name of character encoding to be applied when
         * decoding request parameters.
         */
        value?: string;
    }

    /**
     * <fmt:setLocale>
     * org.apache.taglibs.standard.tag.rt.fmt.SetLocaleTag
     *
     * @description
     * Stores the given locale in the locale configuration variable
     */
    interface SetLocaleTagAttr {
        /**
         * A String value is interpreted as the
         * printable representation of a locale, which
         * must contain a two-letter (lower-case)
         * language code (as defined by ISO-639),
         * and may contain a two-letter (upper-case)
         * country code (as defined by ISO-3166).
         * Language and country codes must be
         * separated by hyphen (-) or underscore
         * (_).
         */
        value: string;

        /**
         * Vendor- or browser-specific variant.
         * See the java.util.Locale javadocs for
         * more information on variants.
         */
        variant?: string;

        /**
         * Scope of the locale configuration variable.
         */
        scope?: string;
    }

    /**
     * <fmt:timeZone>
     * org.apache.taglibs.standard.tag.rt.fmt.TimeZoneTag
     *
     * @description
     * Specifies the time zone for any time formatting or parsing actions
     * nested in its body
     */
    interface TimeZoneTagAttr {
        /**
         * The time zone. A String value is interpreted as
         * a time zone ID. This may be one of the time zone
         * IDs supported by the Java platform (such as
         * "America/Los_Angeles") or a custom time zone
         * ID (such as "GMT-8"). See
         * java.util.TimeZone for more information on
         * supported time zone formats.
         */
        value: string | TimeZone;
    }

    /**
     * <fmt:setTimeZone>
     * org.apache.taglibs.standard.tag.rt.fmt.SetTimeZoneTag
     *
     * @description
     * Stores the given time zone in the time zone configuration variable
     */
    interface SetTimeZoneTagAttr {
        /**
         * The time zone. A String value is interpreted as
         * a time zone ID. This may be one of the time zone
         * IDs supported by the Java platform (such as
         * "America/Los_Angeles") or a custom time zone
         * ID (such as "GMT-8"). See java.util.TimeZone for
         * more information on supported time zone
         * formats.
         */
        value: string | TimeZone;

        /**
         * Name of the exported scoped variable which
         * stores the time zone of type
         * java.util.TimeZone.
         */
        var?: string;

        /**
         * Scope of var or the time zone configuration
         * variable.
         */
        scope?: string;
    }

    /**
     * <fmt:bundle>
     * org.apache.taglibs.standard.tag.rt.fmt.BundleTag
     *
     * @description
     * Loads a resource bundle to be used by its tag body
     */
    interface BundleTagAttr {
        /**
         * Resource bundle base name. This is the bundle's
         * fully-qualified resource name, which has the same
         * form as a fully-qualified class name, that is, it uses
         * "." as the package component separator and does not
         * have any file type (such as ".class" or ".properties")
         * suffix.
         */
        basename: string;

        /**
         * Prefix to be prepended to the value of the message
         * key of any nested <fmt:message> action.
         */
        prefix?: string;
    }

    /**
     * <fmt:setBundle>
     * org.apache.taglibs.standard.tag.rt.fmt.SetBundleTag
     *
     * @description
     * Loads a resource bundle and stores it in the named scoped variable or
     * the bundle configuration variable
     */
    interface SetBundleTagAttr {
        /**
         * Resource bundle base name. This is the bundle's
         * fully-qualified resource name, which has the same
         * form as a fully-qualified class name, that is, it uses
         * "." as the package component separator and does not
         * have any file type (such as ".class" or ".properties")
         * suffix.
         */
        basename: string;

        /**
         * Name of the exported scoped variable which stores
         * the i18n localization context of type
         * javax.servlet.jsp.jstl.fmt.LocalizationC
         * ontext.
         */
        var?: string;

        /**
         * Scope of var or the localization context
         * configuration variable.
         */
        scope?: string;
    }

    /**
     * <fmt:message>
     * org.apache.taglibs.standard.tag.rt.fmt.MessageTag
     *
     * @description
     * Maps key to localized message and performs parametric replacement
     */
    interface MessageTagAttr {
        /**
         * Message key to be looked up.
         */
        key?: string;

        /**
         * Localization context in whose resource
         * bundle the message key is looked up.
         */
        bundle?: Properties;

        /**
         * Name of the exported scoped variable
         * which stores the localized message.
         */
        var?: string;

        /**
         * Scope of var.
         */
        scope?: string;
    }

    /**
     * <fmt:param>
     * org.apache.taglibs.standard.tag.rt.fmt.ParamTag
     *
     * @description
     * Supplies an argument for parametric replacement to a containing
     * <message> tag
     */
    interface ParamTagAttr {
        /**
         * Argument used for parametric replacement.
         */
        value?: string;
    }

    /**
     * <fmt:formatNumber>
     * org.apache.taglibs.standard.tag.rt.fmt.FormatNumberTag
     *
     * @description
     * Formats a numeric value as a number, currency, or percentage
     */
    interface FormatNumberTagAttr {
        /**
         * Numeric value to be formatted.
         */
        value?: string;

        /**
         * Specifies whether the value is to be
         * formatted as number, currency, or
         * percentage.
         */
        type?: string;

        /**
         * Custom formatting pattern.
         */
        pattern?: string;

        /**
         * ISO 4217 currency code. Applied only
         * when formatting currencies (i.e. if type is
         * equal to "currency"); ignored otherwise.
         */
        currencyCode?: string;

        /**
         * Currency symbol. Applied only when
         * formatting currencies (i.e. if type is equal
         * to "currency"); ignored otherwise.
         */
        currencySymbol?: string;

        /**
         * Specifies whether the formatted output
         * will contain any grouping separators.
         */
        groupingUsed?: string;

        /**
         * Maximum number of digits in the integer
         * portion of the formatted output.
         */
        maxIntegerDigits?: string;

        /**
         * Minimum number of digits in the integer
         * portion of the formatted output.
         */
        minIntegerDigits?: string;

        /**
         * Maximum number of digits in the
         * fractional portion of the formatted output.
         */
        maxFractionDigits?: string;

        /**
         * Minimum number of digits in the
         * fractional portion of the formatted output.
         */
        minFractionDigits?: string;

        /**
         * Name of the exported scoped variable
         * which stores the formatted result as a
         * String.
         */
        var?: string;

        /**
         * Scope of var.
         */
        scope?: string;
    }

    /**
     * <fmt:parseNumber>
     * org.apache.taglibs.standard.tag.rt.fmt.ParseNumberTag
     *
     * @description
     * Parses the string representation of a number, currency, or percentage
     */
    interface ParseNumberTagAttr {
        /**
         * String to be parsed.
         */
        value?: string;

        /**
         * Specifies whether the string in the value
         * attribute should be parsed as a number,
         * currency, or percentage.
         */
        type?: string;

        /**
         * Custom formatting pattern that determines
         * how the string in the value attribute is to be
         * parsed.
         */
        pattern?: string;

        /**
         * Locale whose default formatting pattern (for
         * numbers, currencies, or percentages,
         * respectively) is to be used during the parse
         * operation, or to which the pattern specified
         * via the pattern attribute (if present) is
         * applied.
         */
        parseLocale?: string;

        /**
         * Specifies whether just the integer portion of
         * the given value should be parsed.
         */
        integerOnly?: string;

        /**
         * Name of the exported scoped variable which
         * stores the parsed result (of type
         * java.lang.Number).
         */
        var?: string;

        /**
         * Scope of var.
         */
        scope?: string;
    }

    /**
     * <fmt:formatDate>
     * org.apache.taglibs.standard.tag.rt.fmt.FormatDateTag
     *
     * @description
     * Formats a date and/or time using the supplied styles and pattern
     */
    interface FormatDateTagAttr {
        /**
         * Date and/or time to be formatted.
         */
        value: number | Date;

        /**
         * Specifies whether the time, the date, or both
         * the time and date components of the given
         * date are to be formatted.
         */
        type?: string;

        /**
         * Predefined formatting style for dates. Follows
         * the semantics defined in class
         * java.text.DateFormat. Applied only
         * when formatting a date or both a date and
         * time (i.e. if type is missing or is equal to
         * "date" or "both"); ignored otherwise.
         */
        dateStyle?: string;

        /**
         * Predefined formatting style for times. Follows
         * the semantics defined in class
         * java.text.DateFormat. Applied only
         * when formatting a time or both a date and
         * time (i.e. if type is equal to "time" or "both");
         * ignored otherwise.
         */
        timeStyle?: string;

        /**
         * Custom formatting style for dates and times.
         */
        pattern?: string;

        /**
         * Time zone in which to represent the formatted
         * time.
         */
        timeZone?: string | TimeZone;

        /**
         * Name of the exported scoped variable which
         * stores the formatted result as a String.
         */
        var?: string;

        /**
         * Scope of var.
         */
        scope?: string;
    }

    /**
     * <fmt:parseDate>
     * org.apache.taglibs.standard.tag.rt.fmt.ParseDateTag
     *
     * @description
     * Parses the string representation of a date and/or time
     */
    interface ParseDateTagAttr {
        /**
         * Date string to be parsed.
         */
        value?: string;

        /**
         * Specifies whether the date string in the
         * value attribute is supposed to contain a
         * time, a date, or both.
         */
        type?: string;

        /**
         * Predefined formatting style for days
         * which determines how the date
         * component of the date string is to be
         * parsed. Applied only when formatting a
         * date or both a date and time (i.e. if type
         * is missing or is equal to "date" or "both");
         * ignored otherwise.
         */
        dateStyle?: string;

        /**
         * Predefined formatting styles for times
         * which determines how the time
         * component in the date string is to be
         * parsed. Applied only when formatting a
         * time or both a date and time (i.e. if type
         * is equal to "time" or "both"); ignored
         * otherwise.
         */
        timeStyle?: string;

        /**
         * Custom formatting pattern which
         * determines how the date string is to be
         * parsed.
         */
        pattern?: string;

        /**
         * Time zone in which to interpret any time
         * information in the date string.
         */
        timeZone?: string;

        /**
         * Locale whose predefined formatting styles
         * for dates and times are to be used during
         * the parse operation, or to which the
         * pattern specified via the pattern
         * attribute (if present) is applied.
         */
        parseLocale?: string;

        /**
         * Name of the exported scoped variable in
         * which the parsing result (of type
         * java.util.Date) is stored.
         */
        var?: string;

        /**
         * Scope of var.
         */
        scope?: string;
    }
}
