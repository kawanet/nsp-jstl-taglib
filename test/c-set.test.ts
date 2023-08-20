import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {cTags} from "../src/index.js";

const TITLE = "c-set.test.ts";

/**
 * c:set
 */
describe(TITLE, () => {
    const nsp = createNSP();

    nsp.addTagLib({ns: "c", tag: cTags});

    it("set", async () => {
        type Context = { foo?: string };

        const src = '<c:set var="foo" value="FOO"/>[${foo}]';
        // console.warn(nsp.parseJSP(src).toJS());
        const fn = nsp.parse(src).toFn<Context>();

        assert.equal(fn({}), "[FOO]");
    });
});
