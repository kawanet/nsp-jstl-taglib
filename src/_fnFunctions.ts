/**
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/resources/META-INF/fn.tld
 */

import * as fn from "./fn/Functions.js";
import {jstlFn} from "../types/index.js";

export const _fnFunctions: jstlFn.fnFunctions = {
    contains: fn.containsFn,
    containsIgnoreCase: fn.containsIgnoreCaseFn,
    endsWith: fn.endsWithFn,
    escapeXml: fn.escapeXmlFn,
    indexOf: fn.indexOfFn,
    join: fn.joinFn,
    length: fn.lengthFn,
    replace: fn.replaceFn,
    split: fn.splitFn,
    startsWith: fn.startsWithFn,
    substring: fn.substringFn,
    substringAfter: fn.substringAfterFn,
    substringBefore: fn.substringBeforeFn,
    toLowerCase: fn.toLowerCaseFn,
    toUpperCase: fn.toUpperCaseFn,
    trim: fn.trimFn,
};
