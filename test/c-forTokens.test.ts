import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {cTags} from "../index.js";
import {loopStatusStore} from "../src/util/LoopStatus.js";

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

    it('nested', async () => {
        const src: string = '<c:forTokens items="foo,bar" delims="," var="lv1"><c:forTokens items="FOO,BAR" delims="," var="lv2">[${lv1}-${lv2}]</c:forTokens></c:forTokens>';
        assert.equal(await nsp.parse(src).toFn()({}), "[foo-FOO][foo-BAR][bar-FOO][bar-BAR]");
    });

    it('loopStatusStore', async () => {
        nsp.addTagLib({
            ns: "test",
            tag: {
                getIndex: (tag) => {
                    return async (context) => {
                        const store = loopStatusStore(tag.app, context);
                        const status = store.get();
                        return String(status.getIndex());
                    }
                }
            }
        })

        const src: string = '<c:forTokens items="foo,bar" delims="," var="lv1">(#<test:getIndex/>)<c:forTokens items="FOO,BAR" delims="," var="lv2">[<test:getIndex/>]</c:forTokens></c:forTokens>';
        assert.equal(await nsp.parse(src).toFn()({}), "(#0)[0][1](#1)[0][1]");
    });
});
