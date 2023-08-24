import {strict as assert} from "assert";
import {promises as fs} from "fs";
import {createNSP} from "nsp-server-pages";
import {cTags} from "../src/index.js";

const TITLE = "c-out.test.ts";

/**
 * c:out
 */
describe(TITLE, () => {
    const nsp = createNSP();

    nsp.addTagLib({ns: "c", tag: cTags});

    type Context = { foo?: string };

    it("value", async () => {
        const src = '[<c:out value="${foo}"/>]';
        // console.warn(nsp.parse(src).toJS());
        const fn = nsp.parse(src).toFn<Context>();

        assert.equal(fn({foo: "FOO"}), "[FOO]");
        assert.equal(fn({foo: "<XSS>"}), "[&lt;XSS&gt;]");
    });

    it("default", async () => {
        const src = '[<c:out value="${foo}" default="foo"/>]';
        const fn = nsp.parse(src).toFn<Context>();

        assert.equal(fn({foo: null}), "[foo]");
    });

    it(`escapeXml="true"`, async () => {
        const src = '[<c:out value="${foo}" escapeXml="true"/>]';
        const fn = nsp.parse(src).toFn<Context>();

        assert.equal(fn({foo: "<XSS>"}), "[&lt;XSS&gt;]");
    });

    it(`escapeXml="false"`, async () => {
        const src = '[<c:out value="${foo}" escapeXml="false"/>]';
        const fn = nsp.parse(src).toFn<Context>();

        assert.equal(fn({foo: "<XSS>"}), "[<XSS>]");
    });

    /**
     * @see https://github.com/apache/tomcat-taglibs-standard/blob/main/standard-test/src/test/java/org/apache/taglibs/standard/tag/el/core/TestOutTag.java
     */
    it(`TestOutTag`, async () => {
        nsp.options.indent = 4;
        nsp.options.trimSpaces = false;

        const render = await nsp.loadJSP("test/resources/TestOutTag.jsp");
        const result = await render({cats: "cats & dogs", dogs: "cats & dogs"});
        const expected = await fs.readFile("test/resources/TestOutTag.txt", "utf8");
        assert.equal(result, expected);
    });
});
