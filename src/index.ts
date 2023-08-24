/**
 * @see https://github.com/kawanet/nsp-jstl-taglib
 */

import type {JstlC} from "../types/c.js";
import type {JstlFmt} from "../types/fmt.js";
import type {JstlFn} from "../types/fn.js";
import {catchTag} from "./c/CatchTag.js";
import {chooseTag, otherwiseTag, whenTag} from "./c/ChooseTag.js";
import {forEachTag} from "./c/ForEachTag.js";
import {forTokensTag} from "./c/ForTokensTag.js";
import {ifTag} from "./c/IfTag.js";
import {importTag} from "./c/ImportTag.js";
import {outTag} from "./c/OutTag.js";
import {paramTag} from "./c/ParamTag.js";
import {redirectTag} from "./c/RedirectTag.js";
import {removeTag} from "./c/RemoveTag.js";
import {setTag} from "./c/SetTag.js";
import {urlTag} from "./c/UrlTag.js";
import * as fn from "./fn/Functions.js";

export type {JstlC, JstlFmt, JstlFn};

export const cTags: JstlC.cTags = {
    catch: catchTag,
    choose: chooseTag,
    if: ifTag,
    import: importTag,
    forEach: forEachTag,
    forTokens: forTokensTag,
    out: outTag,
    otherwise: otherwiseTag,
    param: paramTag,
    redirect: redirectTag,
    remove: removeTag,
    set: setTag,
    url: urlTag,
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
