/**
 * fn
 * uri: http://java.sun.com/jsp/jstl/functions
 *
 * JSTL 1.1 functions library
 */
export declare namespace JstlFn {
    type fnFunctions = {
        contains: containsFn;
        containsIgnoreCase: containsIgnoreCaseFn;
        endsWith: endsWithFn;
        escapeXml: escapeXmlFn;
        indexOf: indexOfFn;
        join: joinFn;
        length: lengthFn;
        replace: replaceFn;
        split: splitFn;
        startsWith: startsWithFn;
        substring: substringFn;
        substringAfter: substringAfterFn;
        substringBefore: substringBeforeFn;
        toLowerCase: toLowerCaseFn;
        toUpperCase: toUpperCaseFn;
        trim: trimFn;
    };

    /**
     * org.apache.taglibs.standard.functions.Functions
     *
     * @description
     * Tests if an input string contains the specified substring.
     *
     * @example
     * <c:if test="${fn:contains(name, searchString)}">
     */
    type containsFn = (a: string, b: string) => boolean;

    /**
     * org.apache.taglibs.standard.functions.Functions
     *
     * @description
     * Tests if an input string contains the specified substring in a case insensitive way.
     *
     * @example
     * <c:if test="${fn:containsIgnoreCase(name, searchString)}">
     */
    type containsIgnoreCaseFn = (a: string, b: string) => boolean;

    /**
     * org.apache.taglibs.standard.functions.Functions
     *
     * @description
     * Tests if an input string ends with the specified suffix.
     *
     * @example
     * <c:if test="${fn:endsWith(filename, ".txt")}">
     */
    type endsWithFn = (a: string, b: string) => boolean;

    /**
     * org.apache.taglibs.standard.functions.Functions
     *
     * @description
     * Escapes characters that could be interpreted as XML markup.
     *
     * @example
     * ${fn:escapeXml(param:info)}
     */
    type escapeXmlFn = (a: string) => string;

    /**
     * org.apache.taglibs.standard.functions.Functions
     *
     * @description
     * Returns the index withing a string of the first occurrence of a specified substring.
     *
     * @example
     * ${fn:indexOf(name, "-")}
     */
    type indexOfFn = (a: string, b: string) => number;

    /**
     * org.apache.taglibs.standard.functions.Functions
     *
     * @description
     * Joins all elements of an array into a string.
     *
     * @example
     * ${fn:join(array, ";")}
     */
    type joinFn = (a: string[], b: string) => string;

    /**
     * org.apache.taglibs.standard.functions.Functions
     *
     * @description
     * Returns the number of items in a collection, or the number of characters in a string.
     *
     * @example
     * You have ${fn:length(shoppingCart.products)} in your shopping cart.
     */
    type lengthFn = (a: any) => number;

    /**
     * org.apache.taglibs.standard.functions.Functions
     *
     * @description
     * Returns a string resulting from replacing in an input string all occurrences
     * of a "before" string into an "after" substring.
     *
     * @example
     * ${fn:replace(text, "-", "")}
     */
    type replaceFn = (a: string, b: string, c: string) => string;

    /**
     * org.apache.taglibs.standard.functions.Functions
     *
     * @description
     * Splits a string into an array of substrings.
     *
     * @example
     * ${fn:split(customerNames, ";")}
     */
    type splitFn = (a: string, b: string) => string[];

    /**
     * org.apache.taglibs.standard.functions.Functions
     *
     * @description
     * Tests if an input string starts with the specified prefix.
     *
     * @example
     * <c:if test="${fn:startsWith(product.id, "100-")}">
     */
    type startsWithFn = (a: string, b: string) => boolean;

    /**
     * org.apache.taglibs.standard.functions.Functions
     *
     * @description
     * Returns a subset of a string.
     *
     * @example
     * P.O. Box: ${fn:substring(zip, 6, -1)}
     */
    type substringFn = (a: string, b: number, c: number) => string;

    /**
     * org.apache.taglibs.standard.functions.Functions
     *
     * @description
     * Returns a subset of a string following a specific substring.
     *
     * @example
     * P.O. Box: ${fn:substringAfter(zip, "-")}
     */
    type substringAfterFn = (a: string, b: string) => string;

    /**
     * org.apache.taglibs.standard.functions.Functions
     *
     * @description
     * Returns a subset of a string before a specific substring.
     *
     * @example
     * Zip (without P.O. Box): ${fn:substringBefore(zip, "-")}
     */
    type substringBeforeFn = (a: string, b: string) => string;

    /**
     * org.apache.taglibs.standard.functions.Functions
     *
     * @description
     * Converts all of the characters of a string to lower case.
     *
     * @example
     * Product name: ${fn.toLowerCase(product.name)}
     */
    type toLowerCaseFn = (a: string) => string;

    /**
     * org.apache.taglibs.standard.functions.Functions
     *
     * @description
     * Converts all of the characters of a string to upper case.
     *
     * @example
     * Product name: ${fn.UpperCase(product.name)}
     */
    type toUpperCaseFn = (a: string) => string;

    /**
     * org.apache.taglibs.standard.functions.Functions
     *
     * @description
     * Removes white spaces from both ends of a string.
     *
     * @example
     * Name: ${fn.trim(name)}
     */
    type trimFn = (a: string) => string;
}
