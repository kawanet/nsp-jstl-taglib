/**
 * @see https://github.com/kawanet/nsp-jstl-taglib
 */

import {catchTag} from "./src/c/CatchTag.js";
import {chooseTag} from "./src/c/ChooseTag.js";
import {forEachTag} from "./src/c/ForEachTag.js";
import {forTokensTag} from "./src/c/ForTokensTag.js";
import {ifTag} from "./src/c/IfTag.js";
import {importTag} from "./src/c/ImportTag.js";
import {otherwiseTag} from "./src/c/OtherwiseTag.js";
import {outTag} from "./src/c/OutTag.js";
import {paramTag as c_paramTag} from "./src/c/ParamTag.js";
import {redirectTag} from "./src/c/RedirectTag.js";
import {removeTag} from "./src/c/RemoveTag.js";
import {setTag} from "./src/c/SetTag.js";
import {urlTag} from "./src/c/UrlTag.js";
import {whenTag} from "./src/c/WhenTag.js";
import {bundleTag} from "./src/fmt/BundleTag.js";
import {formatDateTag} from "./src/fmt/FormatDateTag.js";
import {formatNumberTag} from "./src/fmt/FormatNumberTag.js";
import {messageTag} from "./src/fmt/MessageTag.js";
import {paramTag as fmt_paramTag} from "./src/fmt/ParamTag.js";
import {parseDateTag} from "./src/fmt/ParseDateTag.js";
import {parseNumberTag} from "./src/fmt/ParseNumberTag.js";
import {requestEncodingTag} from "./src/fmt/RequestEncodingTag.js";
import {setBundleTag} from "./src/fmt/SetBundleTag.js";
import {setLocaleTag} from "./src/fmt/SetLocaleTag.js";
import {setTimeZoneTag} from "./src/fmt/SetTimeZoneTag.js";
import {timeZoneTag} from "./src/fmt/TimeZoneTag.js";
import * as fn from "./src/fn/Functions.js";
import type {JstlC} from "./types/c.js";
import type {JstlFmt} from "./types/fmt.js";
import type {JstlFn} from "./types/fn.js";
import type {JstlUtil} from "./types/util.js";

export type {JstlC, JstlFmt, JstlFn, JstlUtil};

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
