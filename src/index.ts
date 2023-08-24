/**
 * @see https://github.com/kawanet/nsp-jstl-taglib
 */

import type {JstlC} from "../types/c.js";
import type {JstlFmt} from "../types/fmt.js";
import type {JstlFn} from "../types/fn.js";
import {catchTag} from "./c/CatchTag.js";
import {chooseTag} from "./c/ChooseTag.js";
import {forEachTag} from "./c/ForEachTag.js";
import {forTokensTag} from "./c/ForTokensTag.js";
import {ifTag} from "./c/IfTag.js";
import {importTag} from "./c/ImportTag.js";
import {otherwiseTag} from "./c/OtherwiseTag.js";
import {outTag} from "./c/OutTag.js";
import {paramTag as c_paramTag} from "./c/ParamTag.js";
import {redirectTag} from "./c/RedirectTag.js";
import {removeTag} from "./c/RemoveTag.js";
import {setTag} from "./c/SetTag.js";
import {urlTag} from "./c/UrlTag.js";
import {whenTag} from "./c/WhenTag.js";
import {bundleTag} from "./fmt/BundleTag.js";
import {formatDateTag} from "./fmt/FormatDateTag.js";
import {formatNumberTag} from "./fmt/FormatNumberTag.js";
import {messageTag} from "./fmt/MessageTag.js";
import {parseDateTag} from "./fmt/ParseDateTag.js";
import {parseNumberTag} from "./fmt/ParseNumberTag.js";
import {requestEncodingTag} from "./fmt/RequestEncodingTag.js";
import {setBundleTag} from "./fmt/SetBundleTag.js";
import {setLocaleTag} from "./fmt/SetLocaleTag.js";
import {setTimeZoneTag} from "./fmt/SetTimeZoneTag.js";
import {timeZoneTag} from "./fmt/TimeZoneTag.js";
import {paramTag as fmt_paramTag} from "./fmt/ParamTag.js";
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
    param: c_paramTag,
    redirect: redirectTag,
    remove: removeTag,
    set: setTag,
    url: urlTag,
    when: whenTag,
};

export const fmtTags: JstlFmt.fmtTags = {
    requestEncoding: requestEncodingTag,
    setLocale: setLocaleTag,
    timeZone: timeZoneTag,
    setTimeZone: setTimeZoneTag,
    bundle: bundleTag,
    setBundle: setBundleTag,
    message: messageTag,
    param: fmt_paramTag,
    formatNumber: formatNumberTag,
    parseNumber: parseNumberTag,
    formatDate: formatDateTag,
    parseDate: parseDateTag,
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
