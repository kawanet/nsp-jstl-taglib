/**
 * @see https://github.com/kawanet/nsp-jstl-taglib
 */

import {_cTags} from "./_cTags.js";
import {_fmtTags} from "./_fmtTags.js";
import {_fnFunctions} from "./_fnFunctions.js";

import type {jstlC} from "../types/c.js";
import type {jstlFmt} from "../types/fmt.js";
import type {jstlFn} from "../types/fn.js";

export type {jstlC, jstlFmt, jstlFn};

export const cTags = _cTags;

export const fmtTags = _fmtTags;

export const fnFunctions = _fnFunctions;
