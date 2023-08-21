/**
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/java/org/apache/taglibs/standard/functions/Functions.java
 */

import {$$} from "telesy";
import type {JstlFn} from "../index.js";

/**
 * @description
 * Tests if an input string contains the specified substring.
 *
 * @example
 * <c:if test="${fn:contains(name, searchString)}">
 */
export const containsFn: JstlFn.containsFn = (input, substring) => {
    return input?.includes(substring);
};

/**
 * @description
 * Tests if an input string contains the specified substring in a case insensitive way.
 *
 * @example
 * <c:if test="${fn:containsIgnoreCase(name, searchString)}">
 */
export const containsIgnoreCaseFn: JstlFn.containsIgnoreCaseFn = (input, substring) => {
    return containsFn(input?.toUpperCase(), substring?.toUpperCase());
};

/**
 * @description
 * Tests if an input string ends with the specified suffix.
 *
 * @example
 * <c:if test="${fn:endsWith(filename, ".txt")}">
 */
export const endsWithFn: JstlFn.endsWithFn = (input, suffix) => {
    return input?.endsWith(suffix);
};

/**
 * @description
 * Escapes characters that could be interpreted as XML markup.
 *
 * @example
 * ${fn:escapeXml(param:info)}
 */
export const escapeXmlFn: JstlFn.escapeXmlFn = (input) => {
    return $$(input);
};

/**
 * @description
 * Returns the index withing a string of the first occurrence of a specified substring.
 *
 * @example
 * ${fn:indexOf(name, "-")}
 */
export const indexOfFn: JstlFn.indexOfFn = (input, substring) => {
    return input?.indexOf(substring);
};

/**
 * @description
 * Joins all elements of an array into a string.
 *
 * @example
 * ${fn:join(array, ";")}
 */
export const joinFn: JstlFn.joinFn = (array, separator) => {
    return (array ?? []).map(String).join(separator);
};

/**
 * @description
 * Returns the number of items in a collection, or the number of characters in a string.
 *
 * @example
 * You have ${fn:length(shoppingCart.products)} in your shopping cart.
 */
export const lengthFn: JstlFn.lengthFn = (obj) => {
    return (obj as any[])?.length || 0;
};

/**
 * @description
 * Returns a string resulting from replacing in an input string all occurrences
 * of a "before" string into an "after" substring.
 *
 * @example
 * ${fn:replace(text, "-", "")}
 */
export const replaceFn: JstlFn.replaceFn = (input, before, after) => {
    if (!before?.length) {
        return input;
    }

    before = before?.replace(/(\W)/g, "\\$1");
    return input.replace(new RegExp(before, "g"), after);
};

/**
 * @description
 * Splits a string into an array of substrings.
 *
 * @example
 * ${fn:split(customerNames, ";")}
 */
export const splitFn: JstlFn.splitFn = (input, delimiters) => {
    delimiters = delimiters?.replace(/(\W)/g, "\\$1");
    return input?.split(new RegExp(`[${delimiters}]`)).filter((v, idx) => (!idx || v.length));
};

/**
 * @description
 * Tests if an input string starts with the specified prefix.
 *
 * @example
 * <c:if test="${fn:startsWith(product.id, "100-")}">
 */
export const startsWithFn: JstlFn.startsWithFn = (input, prefix) => {
    return input?.startsWith(prefix);
};

/**
 * @description
 * Returns a subset of a string.
 *
 * @example
 * P.O. Box: ${fn:substring(zip, 6, -1)}
 */
export const substringFn: JstlFn.substringFn = (input, beginIndex, endIndex) => {
    if (beginIndex < 0) {
        beginIndex = 0;
    }
    if (endIndex < 0 || endIndex > input?.length) {
        endIndex = input.length;
    }
    if (endIndex < beginIndex) {
        return "";
    }
    return input.substring(beginIndex, endIndex);
};

/**
 * @description
 * Returns a subset of a string following a specific substring.
 *
 * @example
 * P.O. Box: ${fn:substringAfter(zip, "-")}
 */
export const substringAfterFn: JstlFn.substringAfterFn = (input, substring) => {
    const index = input?.indexOf(substring);
    if (index === -1) {
        return "";
    } else {
        return input.substring(index + substring.length);
    }
};

/**
 * @description
 * Returns a subset of a string before a specific substring.
 *
 * @example
 * Zip (without P.O. Box): ${fn:substringBefore(zip, "-")}
 */
export const substringBeforeFn: JstlFn.substringBeforeFn = (input, substring) => {
    const index = input?.indexOf(substring);
    return (index > -1) ? input.substring(0, index) : "";
};

/**
 * @description
 * Converts all of the characters of a string to lower case.
 *
 * @example
 * Product name: ${fn.toLowerCase(product.name)}
 */
export const toLowerCaseFn: JstlFn.toLowerCaseFn = (a) => {
    return a?.toLowerCase();
};

/**
 * @description
 * Converts all of the characters of a string to upper case.
 *
 * @example
 * Product name: ${fn.UpperCase(product.name)}
 */
export const toUpperCaseFn: JstlFn.toUpperCaseFn = (a) => {
    return a?.toUpperCase();
};

/**
 * @description
 * Removes white spaces from both ends of a string.
 *
 * @example
 * Name: ${fn.trim(name)}
 */
export const trimFn: JstlFn.trimFn = (input) => {
    return input.trim();
};
