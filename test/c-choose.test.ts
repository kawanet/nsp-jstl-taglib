import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {cTags} from "../src/index.js";

const TITLE = "c-choose.test.ts";

/**
 * c:choose
 */
describe(TITLE, () => {
    const nsp = createNSP();

    nsp.addTagLib({ns: "c", tag: cTags});

    it("<c:choose></c:choose>", async () => {
        const src: string = '[<c:choose><c:when test="${foo}">FOO</c:when><c:otherwise>BAR</c:otherwise></c:choose>]';
        // console.warn(nsp.parse(src).toJS());

        const fn = nsp.parse(src).toFn();

        assert.equal(fn({foo: true}), "[FOO]");
        assert.equal(fn({foo: false}), "[BAR]");
        assert.equal(fn({foo: "true"}), "[FOO]");
        assert.equal(fn({foo: "false"}), "[BAR]");
    });

    it("<c:when></c:when><c:when></c:when>", async () => {
        const src1: string = '<c:when test="${foo}">FOO</c:when>';
        const src2: string = '<c:when test="${bar}">BAR</c:when>';
        const src3: string = '<c:when test="${buz}">BUZ</c:when>';
        const src4: string = '<c:otherwise>QUX</c:otherwise>';
        const src5 = `[<c:choose>${src1}${src2}${src3}${src4}</c:choose>]`;

        const fn = nsp.parse(src5).toFn();

        assert.equal(fn({foo: true, bar: true, buz: true}), "[FOO]", "#1");
        assert.equal(fn({foo: true, bar: false, buz: false}), "[FOO]", "#2");
        assert.equal(fn({foo: false, bar: true, buz: false}), "[BAR]");
        assert.equal(fn({foo: false, bar: false, buz: true}), "[BUZ]");
        assert.equal(fn({foo: false, bar: false, buz: false}), "[QUX]");
    });

    it("<c:choose><c:choose></c:choose></c:choose>", async () => {
        const src1: string = '[<c:choose><c:when test="${bar}">BAR</c:when><c:otherwise>bar</c:otherwise></c:choose>]';
        const src2: string = '[<c:choose><c:when test="${buz}">BUZ</c:when><c:otherwise>buz</c:otherwise></c:choose>]';
        const src3: string = '[<c:choose><c:when test="${foo}">' + src1 + '</c:when><c:otherwise>' + src2 + '</c:otherwise></c:choose>]';

        const fn = nsp.parse(src3).toFn();

        assert.equal(fn({foo: true, bar: true}), "[[BAR]]");
        assert.equal(fn({foo: true, bar: false}), "[[bar]]");
        assert.equal(fn({foo: false, buz: true}), "[[BUZ]]");
        assert.equal(fn({foo: false, buz: false}), "[[buz]]");
    });

    it("<c:choose></c:choose><c:choose></c:choose>", async () => {
        const src1: string = '[<c:choose><c:when test="${foo}">FOO</c:when><c:otherwise>foo</c:otherwise></c:choose>]';
        const src2: string = '[<c:choose><c:when test="${bar}">BAR</c:when><c:otherwise>bar</c:otherwise></c:choose>]';
        const src3: string = '[<c:choose><c:when test="${buz}">BUZ</c:when><c:otherwise>buz</c:otherwise></c:choose>]';
        const src4 = `${src1}${src2}${src3}`;

        const fn = nsp.parse(src4).toFn();

        assert.equal(fn({foo: true, bar: true, buz: true}), "[FOO][BAR][BUZ]");
        assert.equal(fn({foo: true, bar: false, buz: false}), "[FOO][bar][buz]");
        assert.equal(fn({foo: false, bar: true, buz: false}), "[foo][BAR][buz]");
        assert.equal(fn({foo: false, bar: false, buz: true}), "[foo][bar][BUZ]");
        assert.equal(fn({foo: false, bar: false, buz: false}), "[foo][bar][buz]");
    });
});
