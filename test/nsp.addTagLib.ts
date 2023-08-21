import {createNSP} from "nsp-server-pages";
import {cTags, fmtTags, fnFunctions} from "../src/index.js";

const TITLE = "nsp.addTagLib.ts";

describe(TITLE, () => {
    /**
     * this is a test just to import the taglib but not to run it
     */
    it("nsp.addTagLib", async () => {
        const nsp = createNSP();
        nsp.addTagLib({ns: "c", tag: cTags});
        nsp.addTagLib({ns: "fn", fn: fnFunctions});
        nsp.addTagLib({ns: "fmt", tag: fmtTags});
    });
});
