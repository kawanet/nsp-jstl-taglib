/**
 * @see https://github.com/kawanet/nsp-jstl-taglib
 */

import type {JstlC} from "../types/c.js";
import type {JstlFmt} from "../types/fmt.js";
import type {JstlFn} from "../types/fn.js";
import {chooseTag, otherwiseTag, whenTag} from "./c/ChooseTag.js";
import {ifTag} from "./c/IfTag.js";
import {outTag} from "./c/OutTag.js";
import {removeTag} from "./c/RemoveTag.js";
import {setTag} from "./c/SetTag.js";
import * as fn from "./fn/Functions.js";

export type {JstlC, JstlFmt, JstlFn};

export const cTags: JstlC.cTags = {
    catch: null, // TODO
    choose: chooseTag,
    if: ifTag,
    import: null, // TODO
    forEach: null, // TODO
    forTokens: null, // TODO
    out: outTag,
    otherwise: otherwiseTag,
    param: null, // TODO
    redirect: null, // TODO
    remove: removeTag,
    set: setTag,
    url: null, // TODO
    when: whenTag,
};

export const fmtTags: JstlFmt.fmtTags = {
    requestEncoding: null, // TODO
    setLocale: null, // TODO
    timeZone: null, // TODO
    setTimeZone: null, // TODO
    bundle: null, // TODO
    setBundle: null, // TODO
    message: null, // TODO
    param: null, // TODO
    formatNumber: null, // TODO
    parseNumber: null, // TODO
    formatDate: null, // TODO
    parseDate: null, // TODO
};

export const fnFunctions: JstlFn.fnFunctions = {
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
