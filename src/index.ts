/**
 * @see https://github.com/kawanet/nsp-jstl-taglib
 */

import {_cTags} from "./_cTags.js";
import {_fmtTags} from "./_fmtTags.js";
import {_fnFunctions} from "./_fnFunctions.js";

import type {JstlC} from "../types/c.js";
import type {JstlFmt} from "../types/fmt.js";
import type {JstlFn} from "../types/fn.js";

export type {JstlC, JstlFmt, JstlFn};

export const cTags = _cTags;

export const fmtTags = _fmtTags;

export const fnFunctions = _fnFunctions;
