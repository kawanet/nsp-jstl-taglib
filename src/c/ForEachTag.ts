import type {NSP} from "nsp-server-pages";
import type {JstlC} from "../index.js";

/**
 * <c:forEach>
 * org.apache.taglibs.standard.tag.rt.core.ForEachTag
 *
 * @description
 * The basic iteration tag, accepting many different
 * collection types and supporting subsetting and other
 * functionality
 */

export const forEachTag: NSP.TagFn<JstlC.ForEachTagAttr> = _ => {
    return _ => {
        throw new Error("Not implemented: <c:forEach>");
    };
};
