/**
 * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/impl/src/main/resources/META-INF/c.tld
 */

import {setTag} from "./c/SetTag.js";
import {ifTag} from "./c/IfTag.js";
import {chooseTag, otherwiseTag, whenTag} from "./c/ChooseTag.js";
import {outTag} from "./c/OutTag.js";
import type {jstlC} from "./index.js";

export const _cTags: jstlC.cTags = {
    catch: null,
    choose: chooseTag,
    if: ifTag,
    import: null,
    forEach: null,
    forTokens: null,
    out: outTag,
    otherwise: otherwiseTag,
    param: null,
    redirect: null,
    remove: null,
    set: setTag,
    url: null,
    when: whenTag,
};
