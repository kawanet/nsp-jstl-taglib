/**
 * @see https://github.com/kawanet/nsp-jstl-taglib
 */

import type {jstlC} from "./c.js";
import type {jstlFmt} from "./fmt.js";
import type {jstlFn} from "./fn.js";

export type {jstlC, jstlFmt, jstlFn};

export const cTags: jstlC.cTags;

export const fmtTags: jstlFmt.fmtTags;

export const fnFunctions: jstlFn.fnFunctions;
