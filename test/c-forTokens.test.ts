import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {cTags} from "../index.js";

const TITLE = "c-forTokens.test.ts";

/**
 * <c:forTokens>
 */
describe(TITLE, () => {
    const nsp = createNSP({indent: 4});

    nsp.addTagLib({ns: "c", tag: cTags});

    it('<c:forTokens>', async () => {
        const src: string = '<c:forTokens items="A,B,C" delims="," var="foo">[${ foo }]</c:forTokens>';
        // console.warn(nsp.parse(src).toJS());
        assert.equal(await nsp.parse(src).toFn()({}), "[A][B][C]");
    });

    it('<c:forTokens begin="1">', async () => {
        const src: string = '<c:forTokens items="A,B,C,D,E" delims="," var="foo" begin="1" end="3" step="2">[${ foo }]</c:forTokens>';
        // console.warn(nsp.parse(src).toJS());
        assert.equal(await nsp.parse(src).toFn()({}), "[B][D]");
    });

    it('<c:forTokens varStatus="status">', async () => {
        const src: string = '<c:forTokens items="A,B,C,D,E" delims="," varStatus="status" begin="1" end="3" step="2">[${ status.index }]</c:forTokens>';
        // console.warn(nsp.parse(src).toJS());
        assert.equal(await nsp.parse(src).toFn()({}), "[1][3]");
    });
});
