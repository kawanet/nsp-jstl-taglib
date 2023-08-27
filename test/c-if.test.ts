import {strict as assert} from "assert";
import {createNSP} from "nsp-server-pages";
import {cTags} from "../index.js";

const TITLE = "c-if.test.ts";

/**
 * c:if
 */
describe(TITLE, () => {
    const nsp = createNSP();

    nsp.addTagLib({ns: "c", tag: cTags});

    it('test="true"', async () => {
        const src = '[<c:if test="true">TRUE</c:if>]';
        // console.warn(nsp.parse(src).toJS());
        const fn = nsp.parse(src).toFn();

        assert.equal(fn({}), "[TRUE]");
    });

    it('test="${true}"', async () => {
        const src = '[<c:if test="${true}">TRUE</c:if>]';
        const fn = nsp.parse(src).toFn();

        assert.equal(fn({}), "[TRUE]");
    });

    it('test="${false}"', async () => {
        const src = '[<c:if test="${false}">TRUE</c:if>]';
        const fn = nsp.parse(src).toFn();

        assert.equal(fn({}), "[]");
    });

    it('test="${null}"', async () => {
        const src = '[<c:if test="${null}">TRUE</c:if>]';
        const fn = nsp.parse(src).toFn();

        assert.equal(fn({}), "[]");
    });

    it('test="${pn > 2}"', async () => {
        const src = '[<c:if test="${pn > 2}">TRUE</c:if>]';
        const fn = nsp.parse(src).toFn();

        assert.equal(fn({pn: null}), "[]", "#1");
        assert.equal(fn({pn: 1}), "[]", "#2");
        assert.equal(fn({pn: 2}), "[]", "#3");
        assert.equal(fn({pn: 3}), "[TRUE]", "#4");
    });

    it('test="${pn < 2}"', async () => {
        const src = '[<c:if test="${pn < 2}">TRUE</c:if>]';
        const fn = nsp.parse(src).toFn();

        assert.equal(fn({pn: null}), "[TRUE]", "#1");
        assert.equal(fn({pn: 0}), "[TRUE]", "#2");
        assert.equal(fn({pn: 1}), "[TRUE]", "#3");
        assert.equal(fn({pn: 2}), "[]", "#4");
    });

    it('var="result"', async () => {
        const src = '[<c:if test="${cond}" var="result">TRUE</c:if>][${result ? "TRUE": "FALSE"}]';
        const fn = nsp.parse(src).toFn();

        assert.equal(fn({cond: true}), "[TRUE][TRUE]");
        assert.equal(fn({cond: false}), "[][FALSE]");
        assert.equal(fn({cond: null}), "[][FALSE]");
    });
});
